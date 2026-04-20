from app.domain.utils.validation import validate_code_params


def _bhattacharyya_sequence_bec(N: int, design_ebn0_db: float) -> list[float]:
    """
    Builds a simple reliability sequence using Bhattacharyya recursion.
    This is a heuristic educational approximation, suitable for MVP.
    Lower value => more reliable channel.
    """
    validate_code_params(N, 1)

    snr_linear = 10 ** (design_ebn0_db / 10.0)
    z = [0.5 * (2.718281828459045 ** (-snr_linear))]

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
    """
    Returns:
        mask: binary vector where 1 = information bit, 0 = frozen bit
        info_positions: indices used for information bits
        frozen_positions: indices used for frozen bits
    """
    validate_code_params(N, K)

    reliability = _bhattacharyya_sequence_bec(N, design_ebn0_db)

    sorted_positions = sorted(range(N), key=lambda idx: reliability[idx])
    info_positions = sorted(sorted_positions[:K])
    frozen_positions = sorted(set(range(N)) - set(info_positions))

    mask = [1 if idx in info_positions else 0 for idx in range(N)]

    return mask, info_positions, frozen_positions


def polar_encode(u: list[int]) -> list[int]:
    """
    In-place style iterative polar transform.
    Input:
        u - source vector of length N (N must be a power of two)
    Output:
        encoded codeword x
    """
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
    """
    Returns intermediate encoder stages for visualization.
    The first element is the input vector, the last is the codeword.
    """
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