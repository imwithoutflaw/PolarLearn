import math

from app.domain.utils.validation import validate_code_params, validate_llr, validate_mask


def logdomain_sum(x: float, y: float) -> float:
    if x > y:
        return x + math.log1p(math.exp(y - x))
    return y + math.log1p(math.exp(x - y))


def logdomain_diff(x: float, y: float) -> float:
    if x == -math.inf:
        return -math.inf
    if y == -math.inf:
        return x
    if y > x:
        x, y = y, x

    d = 1.0 - math.exp(y - x)
    if d <= 0:
        return -math.inf

    return x + math.log(d)


def construct_mask(N: int, K: int, design_ebn0_db: float) -> tuple[list[int], list[int], list[int]]:
    """
    Constructs polar code mask using Bhattacharyya-like AWGN reliability recursion.

    Current project convention:
    mask[i] = 1 -> information bit
    mask[i] = 0 -> frozen bit
    """
    validate_code_params(N, K)

    n = int(math.log2(N))

    ebn0_linear = 10 ** (design_ebn0_db / 10.0)
    rate = K / N
    ebn0_normalized = ebn0_linear * rate

    z0 = -ebn0_normalized

    z = [[0.0 for _ in range(n + 1)] for _ in range(N)]

    for i in range(N):
        z[i][0] = z0

    for depth in range(1, n + 1):
        block = 2 ** depth
        half = block // 2

        for start in range(0, N, block):
            for i in range(half):
                top = start + i
                bottom = start + half + i

                z_top = z[top][depth - 1]
                z_bottom = z[bottom][depth - 1]

                s = logdomain_sum(z_top, z_bottom)
                z_minus = logdomain_diff(s, z_top + z_bottom)
                z_plus = z_top + z_bottom

                z[top][depth] = z_minus
                z[bottom][depth] = z_plus

    reliability = [z[i][n] for i in range(N)]

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
    return logdomain_sum(a + b, 0.0) - logdomain_sum(a, b)


def _g_func(a: float, b: float, u: int) -> float:
    return b + ((1 - 2 * u) * a)


def _sc_decode_recursive(
    llr: list[float],
    mask: list[int],
    offset: int,
    trace: list[dict],
    decisions: list[int],
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
            decisions[bit_index] = 0
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
        decisions[bit_index] = decision
        return [decision]

    half = n // 2

    left_llr = []

    for i in range(half):
        value = _f_func(llr[i], llr[i + half])
        left_llr.append(value)

        trace.append(
            {
                "step_type": "f",
                "offset": offset,
                "size": n,
                "bit_index": None,
                "role": None,
                "llr_value": value,
                "decision": None,
                "left_bits": None,
                "right_bits": None,
                "combined_bits": None,
                "source_a": offset + i,
                "source_b": offset + i + half,
                "target": offset + i,
            }
        )
    u_left = _sc_decode_recursive(left_llr, mask, offset, trace, decisions)

    right_llr = []

    for i in range(half):
        value = _g_func(llr[i], llr[i + half], u_left[i])
        right_llr.append(value)

        trace.append(
            {
                "step_type": "g",
                "offset": offset,
                "size": n,
                "bit_index": None,
                "role": None,
                "llr_value": value,
                "decision": None,
                "left_bits": None,
                "right_bits": None,
                "combined_bits": None,
                "source_a": offset + i,
                "source_b": offset + i + half,
                "target": offset + i + half,
            }
        )
    u_right = _sc_decode_recursive(right_llr, mask, offset + half, trace, decisions)

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
) -> tuple[list[int], list[int], list[dict]]:
    N = len(llr)
    validate_code_params(N, 1)
    validate_llr(llr, N)
    validate_mask(mask, N)

    trace: list[dict] = []
    decisions = [0] * N

    _sc_decode_recursive(
        llr=llr,
        mask=mask,
        offset=0,
        trace=trace,
        decisions=decisions,
    )

    u_hat = decisions
    estimated_bits = [u_hat[i] for i in range(N) if mask[i] == 1]

    if return_trace:
        return u_hat, estimated_bits, trace

    return u_hat, estimated_bits, []

def hard_decision(llr: float) -> int:
    return 0 if llr >= 0 else 1


def upper_llr(l1: float, l2: float) -> float:
    return logdomain_sum(l1 + l2, 0.0) - logdomain_sum(l1, l2)


def lower_llr(l1: float, l2: float, b: int) -> float:
    if b == 0:
        return l1 + l2
    return l1 - l2


def active_llr_level(i: int, n: int) -> int:
    mask = 2 ** (n - 1)
    cnt = 1

    for _ in range(n):
        if (mask & i) == 0:
            cnt += 1
            mask >>= 1
        else:
            break

    return min(cnt, n)


def active_bit_level(i: int, n: int) -> int:
    mask = 2 ** (n - 1)
    cnt = 1

    for _ in range(n):
        if (mask & i) > 0:
            cnt += 1
            mask >>= 1
        else:
            break

    return min(cnt, n)


def bit_reversed(i: int, n: int) -> int:
    result = 0

    for k in range(n):
        if (i >> k) & 1:
            result |= 1 << (n - 1 - k)

    return result


def sc_decode_for_ber(llr: list[float], mask: list[int]) -> tuple[list[int], list[int]]:
    """
    Iterative SC decoder for BER simulation.

    Project mask convention:
    mask[i] = 1 -> information bit
    mask[i] = 0 -> frozen bit
    """
    N = len(llr)
    n = int(round(math.log2(N)))

    validate_llr(llr, N)
    validate_mask(mask, N)

    L = [[float("nan") for _ in range(n + 1)] for _ in range(N)]
    B = [[0 for _ in range(n + 1)] for _ in range(N)]

    for i in range(N):
        L[i][0] = llr[i]

    frozen_set = {i for i, value in enumerate(mask) if value == 0}

    for i in range(N):
        l = bit_reversed(i, n)

        for s in range(n - active_llr_level(l, n), n):
            block_size = 2 ** (s + 1)
            branch_size = block_size // 2

            for j in range(l, N, block_size):
                if j % block_size < branch_size:
                    top_llr = L[j][s]
                    bottom_llr = L[j + branch_size][s]
                    L[j][s + 1] = upper_llr(top_llr, bottom_llr)
                else:
                    bottom_llr = L[j][s]
                    top_llr = L[j - branch_size][s]
                    top_bit = B[j - branch_size][s + 1]
                    L[j][s + 1] = lower_llr(bottom_llr, top_llr, top_bit)

        if l in frozen_set:
            B[l][n] = 0
        else:
            B[l][n] = hard_decision(L[l][n])

        if l < N / 2:
            continue

        for s in range(n, n - active_bit_level(l, n), -1):
            block_size = 2 ** s
            branch_size = block_size // 2

            for j in range(l, -1, -block_size):
                if j % block_size >= branch_size:
                    B[j - branch_size][s - 1] = (
                        B[j][s] ^ B[j - branch_size][s]
                    )
                    B[j][s - 1] = B[j][s]

    u_hat = [int(B[i][n]) for i in range(N)]
    estimated_bits = [u_hat[i] for i in range(N) if mask[i] == 1]

    return u_hat, estimated_bits