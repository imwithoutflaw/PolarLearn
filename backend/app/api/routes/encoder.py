from fastapi import APIRouter

from app.api.schemas.encoder import EncoderRequest, EncoderResponse
from app.domain.services.encoder_service import run_encoder

router = APIRouter()


@router.post("/run", response_model=EncoderResponse)
def encoder_endpoint(request: EncoderRequest):
    return run_encoder(request)