from app.domain.polar_core import compute_stages, polar_encode
from app.domain.services.encoder_service import build_encoder_response


def test_polar_encode_length_is_preserved():
    u = [0, 1, 0, 1, 1, 0, 1, 0]
    x = polar_encode(u)

    assert len(x) == len(u)


def test_compute_stages_starts_with_input_and_ends_with_codeword():
    u = [1, 0, 1, 1, 0, 0, 0, 0]

    stages = compute_stages(u)
    codeword = polar_encode(u)

    assert stages[0] == u
    assert stages[-1] == codeword


def test_compute_stages_count_for_n8():
    u = [1, 0, 1, 1, 0, 0, 0, 0]

    stages = compute_stages(u)

    # input stage + 3 transform stages for N=8
    assert len(stages) == 4


def test_encoder_service_returns_consistent_shapes():
    response = build_encoder_response(
        N=8,
        K=4,
        design_ebn0_db=2.0,
        info_bits=[1, 0, 1, 1],
    )

    assert response.N == 8
    assert response.K == 4
    assert len(response.mask) == 8
    assert len(response.info_positions) == 4
    assert len(response.frozen_positions) == 4
    assert len(response.u_vector) == 8
    assert len(response.codeword) == 8
    assert len(response.stages) == 4


def test_encoder_service_places_info_bits_into_info_positions():
    info_bits = [1, 0, 1, 1]

    response = build_encoder_response(
        N=8,
        K=4,
        design_ebn0_db=2.0,
        info_bits=info_bits,
    )

    extracted = [response.u_vector[pos] for pos in response.info_positions]
    frozen_values = [response.u_vector[pos] for pos in response.frozen_positions]

    assert extracted == info_bits
    assert all(bit == 0 for bit in frozen_values)