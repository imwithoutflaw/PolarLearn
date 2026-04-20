import math

from app.domain.utils.validation import validate_code_params, validate_llr, validate_mask


def _bhattacharyya_sequence_bec(N: int, design_ebn0_db: float) -> list[float]:
    """
    Builds a simple reliability sequence using Bhattacharyya recursion.
    This is a heuristic educational approximation, suitable for MVP.
    Lower value => more reliable channel.
    """
    validate_code_params(N, 1)

    snr_linear = 10 ** (design_ebn0_db / 10.0)
    z = [0.5 * math.exp(-snr_linear)]

    while len(z) < N:
        next_z = []
        for value in z:
            upper = 2 * value - value * value
            lower = value * value

            upper = min(max(upper, 0.0), 1.0)
            lower = min(max(lower, 0.0), 1.0)

            next_z.append(upper)
            next_z.append(lower)

        z = next_z

    return z


def construct_mask(N: int, K: int, design_ebn0_db: float) -> tuple[list[int], list[int], list[int]]:
    validate_code_params(N, K)

    reliability = _bhattacharyya_sequence_bec(N, design_ebn0_db)

    sorted_positions = sorted(range(N), key=lambda idx: reliability[idx])
    info_positions = sorted(sorted_positions[:K])
    frozen_positions = sorted(set(range(N)) - set(info_positions))

    mask = [1 if idx in info_positions else 0 for idx in range(N)]

    return mask, info_positions, frozen_positions


def polar_encode(u: list[int]) -> list[int]:
    N = len(u)
    validate_code_params(N, 1)

    x = u[:]
    step = 1

    while step < N:
        block_size = step * 2
        for start in range(0, N, block_size):
            for i in range(step):
                x[start + i] ^= x[start + i + step]
        step *= 2

    return x


def compute_stages(u: list[int]) -> list[list[int]]:
    N = len(u)
    validate_code_params(N, 1)

    stages = [u[:]]
    x = u[:]
    step = 1

    while step < N:
        block_size = step * 2
        for start in range(0, N, block_size):
            for i in range(step):
                x[start + i] ^= x[start + i + step]
        stages.append(x[:])
        step *= 2

    return stages


def _f_func(a: float, b: float) -> float:
    sign = 1.0
    if a < 0:
        sign *= -1.0
    if b < 0:
        sign *= -1.0
    return sign * min(abs(a), abs(b))


def _g_func(a: float, b: float, u: int) -> float:
    return b + ((1 - 2 * u) * a)


def _sc_decode_recursive(
    llr: list[float],
    mask: list[int],
    offset: int,
    trace: list[dict],
) -> list[int]:
    n = len(llr)

    if n == 1:
        bit_index = offset

        if mask[bit_index] == 0:
            trace.append(
                {
                    "step_type": "leaf_decision",
                    "offset": offset,
                    "size": 1,
                    "bit_index": bit_index,
                    "role": "frozen",
                    "llr_value": llr[0],
                    "decision": 0,
                    "left_bits": None,
                    "right_bits": None,
                    "combined_bits": [0],
                }
            )
            return [0]

        decision = 0 if llr[0] >= 0 else 1
        trace.append(
            {
                "step_type": "leaf_decision",
                "offset": offset,
                "size": 1,
                "bit_index": bit_index,
                "role": "info",
                "llr_value": llr[0],
                "decision": decision,
                "left_bits": None,
                "right_bits": None,
                "combined_bits": [decision],
            }
        )
        return [decision]

    half = n // 2

    left_llr = [_f_func(llr[i], llr[i + half]) for i in range(half)]
    u_left = _sc_decode_recursive(left_llr, mask, offset, trace)

    right_llr = [_g_func(llr[i], llr[i + half], u_left[i]) for i in range(half)]
    u_right = _sc_decode_recursive(right_llr, mask, offset + half, trace)

    u = [0] * n
    for i in range(half):
        u[i] = u_left[i] ^ u_right[i]
        u[i + half] = u_right[i]

    trace.append(
        {
            "step_type": "combine",
            "offset": offset,
            "size": n,
            "bit_index": None,
            "role": None,
            "llr_value": None,
            "decision": None,
            "left_bits": u_left,
            "right_bits": u_right,
            "combined_bits": u,
        }
    )

    return u


def sc_decode(
    llr: list[float],
    mask: list[int],
    return_trace: bool = True,
) -> tuple[list[int], list[dict]]:
    N = len(llr)
    validate_code_params(N, 1)
    validate_llr(llr, N)
    validate_mask(mask, N)

    trace: list[dict] = []
    u_hat = _sc_decode_recursive(llr=llr, mask=mask, offset=0, trace=trace)

    estimated_bits = [u_hat[i] for i in range(N) if mask[i] == 1]

    if return_trace:
        return estimated_bits, trace

    return estimated_bits, []