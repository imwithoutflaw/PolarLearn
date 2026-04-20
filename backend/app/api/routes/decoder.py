from fastapi import APIRouter

from app.api.schemas.decoder import DecoderRequest, DecoderResponse

router = APIRouter()


@router.post("/sc-run", response_model=DecoderResponse)
def run_decoder(payload: DecoderRequest):
    return DecoderResponse(
        estimated_bits=[],
        steps=["Decoder is not implemented yet"],
    )