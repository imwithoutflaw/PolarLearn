from app.api.schemas.decoder import DecoderResponse
from app.domain.polar_core import sc_decode
from app.domain.utils.validation import validate_code_params, validate_llr, validate_mask


def build_decoder_response(N: int, llr: list[float], mask: list[int]) -> DecoderResponse:
    validate_code_params(N, 1)
    validate_llr(llr, N)
    validate_mask(mask, N)

    estimated_bits, steps = sc_decode(
        llr=llr,
        mask=mask,
        return_trace=True,
    )

    return DecoderResponse(
        estimated_bits=estimated_bits,
        steps=steps,
    )