import random

from app.api.schemas.ber import (
    BerCompareResponse,
    BerCompareSeriesResponse,
    BerPointResponse,
    BerResponse,
    TheoreticalPointResponse,
)
from app.domain.polar_core import construct_mask, polar_encode, sc_decode
from app.domain.utils.math_helpers import (
    awgn_channel,
    bpsk_modulate,
    compute_llr_from_received,
    compute_sigma_from_ebn0,
    theoretical_uncoded_bpsk_ber,
)
from app.domain.utils.validation import (
    validate_code_params,
    validate_ebn0_points,
    validate_frames,
    validate_info_bits,
)


def _simulate_single_code(
    N: int,
    K: int,
    design_ebn0_db: float,
    ebn0_points_db: list[float],
    frames: int,
) -> list[BerPointResponse]:
    validate_code_params(N, K)
    validate_ebn0_points(ebn0_points_db)
    validate_frames(frames)

    mask, info_positions, _ = construct_mask(
        N=N,
        K=K,
        design_ebn0_db=design_ebn0_db,
    )

    rate = K / N
    results: list[BerPointResponse] = []

    for ebn0_db in ebn0_points_db:
        sigma = compute_sigma_from_ebn0(ebn0_db=ebn0_db, rate=rate)

        bit_errors = 0
        frame_errors = 0
        total_bits = 0
        total_frames = 0

        for _ in range(frames):
            info_bits = [random.randint(0, 1) for _ in range(K)]
            validate_info_bits(info_bits, K)

            u_vector = [0] * N
            for bit, pos in zip(info_bits, info_positions):
                u_vector[pos] = bit

            codeword = polar_encode(u_vector)
            tx_symbols = bpsk_modulate(codeword)
            rx_symbols = awgn_channel(tx_symbols, sigma=sigma)
            llr = compute_llr_from_received(rx_symbols, sigma=sigma)

            estimated_bits, _ = sc_decode(llr=llr, mask=mask, return_trace=False)

            errors_in_frame = sum(
                1
                for expected, estimated in zip(info_bits, estimated_bits)
                if expected != estimated
            )

            bit_errors += errors_in_frame
            frame_errors += 1 if errors_in_frame > 0 else 0
            total_bits += K
            total_frames += 1

        ber = bit_errors / total_bits if total_bits else 0.0
        fer = frame_errors / total_frames if total_frames else 0.0

        results.append(
            BerPointResponse(
                ebn0_db=ebn0_db,
                ber=ber,
                fer=fer,
                bit_errors=bit_errors,
                frame_errors=frame_errors,
                total_bits=total_bits,
                total_frames=total_frames,
            )
        )

    return results


def build_ber_response(
    N: int,
    K: int,
    design_ebn0_db: float,
    ebn0_points_db: list[float],
    frames: int,
) -> BerResponse:
    results = _simulate_single_code(
        N=N,
        K=K,
        design_ebn0_db=design_ebn0_db,
        ebn0_points_db=ebn0_points_db,
        frames=frames,
    )

    return BerResponse(
        N=N,
        K=K,
        design_ebn0_db=design_ebn0_db,
        results=results,
        explanation=(
            "BER/FER simulation was performed using random information bits, "
            "polar encoding, BPSK modulation, AWGN channel, LLR computation, "
            "and baseline SC decoding."
        ),
    )


def build_ber_compare_response(
    codes: list,
    design_ebn0_db: float,
    ebn0_points_db: list[float],
    frames: int,
) -> BerCompareResponse:
    validate_ebn0_points(ebn0_points_db)
    validate_frames(frames)

    series: list[BerCompareSeriesResponse] = []

    for code in codes:
        N = code.N
        K = code.K
        validate_code_params(N, K)

        results = _simulate_single_code(
            N=N,
            K=K,
            design_ebn0_db=design_ebn0_db,
            ebn0_points_db=ebn0_points_db,
            frames=frames,
        )

        series.append(
            BerCompareSeriesResponse(
                N=N,
                K=K,
                rate=K / N,
                results=results,
            )
        )

    theoretical_curve = [
        TheoreticalPointResponse(
            ebn0_db=point,
            ber=theoretical_uncoded_bpsk_ber(point),
        )
        for point in ebn0_points_db
    ]

    return BerCompareResponse(
        design_ebn0_db=design_ebn0_db,
        ebn0_points_db=ebn0_points_db,
        frames=frames,
        series=series,
        theoretical_uncoded_bpsk=theoretical_curve,
        explanation=(
            "Comparison includes simulated BER/FER curves for multiple polar code lengths "
            "and the reference theoretical uncoded BPSK BER curve in AWGN."
        ),
    )