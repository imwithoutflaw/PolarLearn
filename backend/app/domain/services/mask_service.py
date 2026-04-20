from app.api.schemas.mask import MaskResponse
from app.domain.polar_core import construct_mask


def build_mask_response(N: int, K: int, design_ebn0_db: float) -> MaskResponse:
    mask, info_positions, frozen_positions = construct_mask(
        N=N,
        K=K,
        design_ebn0_db=design_ebn0_db,
    )

    return MaskResponse(
        N=N,
        K=K,
        rate=K / N,
        info_positions=info_positions,
        frozen_positions=frozen_positions,
        mask=mask,
        explanation=(
            "Mask was constructed using a simple reliability ordering "
            "based on Bhattacharyya-style recursion for educational use."
        ),
    )