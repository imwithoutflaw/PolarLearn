from app.api.schemas.encoder import EncoderResponse
from app.core.exceptions import ValidationError
from app.domain.polar_core import compute_stages, construct_mask, polar_encode
from app.domain.utils.validation import validate_code_params, validate_info_bits


def build_encoder_response(N: int, K: int, info_bits: list[int]) -> EncoderResponse:
    validate_code_params(N, K)
    validate_info_bits(info_bits, K)

    # MVP: використовуємо ту ж базову конструкцію маски з фіксованим design_ebn0_db
    # Пізніше винесемо це в окремий параметр або спільну конфігурацію.
    mask, info_positions, _ = construct_mask(N=N, K=K, design_ebn0_db=2.0)

    u_vector = [0] * N

    for bit, pos in zip(info_bits, info_positions):
        if mask[pos] != 1:
            raise ValidationError("Internal mapping error: info bit assigned to frozen position.")
        u_vector[pos] = bit

    codeword = polar_encode(u_vector)
    stages = compute_stages(u_vector)

    return EncoderResponse(
        u_vector=u_vector,
        codeword=codeword,
        stages=stages,
        explanation=(
            "Information bits were placed into information positions of u-vector, "
            "then the polar transform was applied stage by stage."
        ),
    )