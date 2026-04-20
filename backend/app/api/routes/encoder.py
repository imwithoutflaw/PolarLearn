from fastapi import APIRouter

from app.api.schemas.encoder import EncoderRequest, EncoderResponse

router = APIRouter()


@router.post("/run", response_model=EncoderResponse)
def run_encoder(payload: EncoderRequest):
    return EncoderResponse(
        u_vector=[],
        codeword=[],
        stages=[],
        explanation="Encoder is not implemented yet",
    )