from app.domain.polar_core import polar_encode
from app.domain.polar_viz import compute_stages


def run_encoder(data):
    N = data.N
    K = data.K
    info_bits = data.info_bits

    # TODO: build u vector (info + frozen)
    u = [0] * N

    info_idx = 0
    for i in range(N):
        if info_idx < K:
            u[i] = info_bits[info_idx]
            info_idx += 1

    codeword = polar_encode(u)
    stages = compute_stages(u)

    return {
        "u_vector": u,
        "codeword": codeword,
        "stages": stages,
        "explanation": "Encoding is performed using recursive butterfly operations."
    }