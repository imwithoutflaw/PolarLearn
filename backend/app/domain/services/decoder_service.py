from app.api.schemas.decoder import DecodeStep, DecoderResponse
from app.domain.polar_core import sc_decode
from app.domain.utils.validation import validate_code_params, validate_llr, validate_mask


def build_decoder_response(N: int, llr: list[float], mask: list[int]) -> DecoderResponse:
    validate_code_params(N, 1)
    validate_llr(llr, N)
    validate_mask(mask, N)

    u_hat, estimated_bits, raw_steps = sc_decode(
        llr=llr,
        mask=mask,
        return_trace=True,
    )

    steps = [DecodeStep(**step) for step in raw_steps]

    return DecoderResponse(
        u_hat=u_hat,
        estimated_bits=estimated_bits,
        msg_hat=estimated_bits,
        steps=steps,
        decode_ok=True,
    )