from app.api.schemas.decoder import DecodeStep, DecoderResponse
from app.domain.polar_core import sc_decode
from app.domain.utils.validation import validate_code_params, validate_llr, validate_mask


def build_decoder_response(N: int, llr: list[float], mask: list[int]) -> DecoderResponse:
    validate_code_params(N, 1)
    validate_llr(llr, N)
    validate_mask(mask, N)

    estimated_bits, raw_steps = sc_decode(
        llr=llr,
        mask=mask,
        return_trace=True,
    )

    estimated_bits_copy = estimated_bits[:]

    u_hat = []
    info_index = 0

    for i in range(N):
        if mask[i] == 1:
            u_hat.append(estimated_bits[info_index])
            info_index += 1
        else:
            u_hat.append(0)

    steps = [DecodeStep(**step) for step in raw_steps]

    return DecoderResponse(
        u_hat=u_hat,
        estimated_bits=estimated_bits_copy,
        msg_hat=estimated_bits_copy,
        steps=steps,
        decode_ok=True,
    )