from typing import Dict


from app.domain.polar_core import construct_mask


def build_mask(data) -> Dict:
    N = data.N

    if data.K is not None:
        K = data.K
    else:
        K = int(data.R * N)

    mask, info_positions, frozen_positions = construct_mask(
        N=N,
        K=K,
        design_ebn0_db=data.design_ebn0_db
    )

    return {
        "N": N,
        "K": K,
        "rate": K / N,
        "info_positions": info_positions,
        "frozen_positions": frozen_positions,
        "mask": mask,
        "explanation": "Mask defines which bit positions carry information (1) and which are frozen (0)."
    }