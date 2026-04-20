from fastapi import APIRouter

from app.api.schemas.decoder import DecoderRequest, DecoderResponse
from app.domain.services.decoder_service import run_decoder

router = APIRouter()


@router.post("/sc-run", response_model=DecoderResponse)
def decoder_endpoint(request: DecoderRequest):
    return run_decoder(request)