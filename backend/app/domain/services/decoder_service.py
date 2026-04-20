from app.domain.polar_core import sc_decode


def run_decoder(data):
    result, trace = sc_decode(
        llr=data.llr,
        mask=data.mask,
        return_trace=True
    )

    return {
        "estimated_bits": result,
        "steps": trace
    }