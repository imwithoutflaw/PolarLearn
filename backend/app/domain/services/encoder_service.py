from app.api.schemas.encoder import EncoderResponse
from app.core.exceptions import ValidationError
from app.domain.polar_core import compute_stages, construct_mask, polar_encode
from app.domain.utils.validation import validate_code_params, validate_info_bits


def build_encoder_response(
    N: int,
    K: int,
    design_ebn0_db: float,
    info_bits: list[int],
) -> EncoderResponse:
    validate_code_params(N, K)
    validate_info_bits(info_bits, K)

    mask, info_positions, frozen_positions = construct_mask(
        N=N,
        K=K,
        design_ebn0_db=design_ebn0_db,
    )

    u_vector = [0] * N

    for bit, pos in zip(info_bits, info_positions):
        if mask[pos] != 1:
            raise ValidationError(
                "Internal mapping error: info bit assigned to frozen position."
            )
        u_vector[pos] = bit

    codeword = polar_encode(u_vector)
    stages = compute_stages(u_vector)

    return EncoderResponse(
        N=N,
        K=K,
        design_ebn0_db=design_ebn0_db,
        mask=mask,
        info_positions=info_positions,
        frozen_positions=frozen_positions,
        u_vector=u_vector,
        codeword=codeword,
        stages=stages,
        explanation=(
            "Mask was constructed from N, K and design Eb/N0, then information bits "
            "were placed into information positions of the u-vector, and finally "
            "the polar transform was applied stage by stage."
        ),
    )