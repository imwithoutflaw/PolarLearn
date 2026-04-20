from fastapi import APIRouter, HTTPException

from app.api.schemas.encoder import EncoderRequest, EncoderResponse
from app.core.exceptions import ValidationError
from app.domain.services.encoder_service import build_encoder_response

router = APIRouter()


@router.post("/run", response_model=EncoderResponse)
def run_encoder(payload: EncoderRequest):
    try:
        return build_encoder_response(
            N=payload.N,
            K=payload.K,
            design_ebn0_db=payload.design_ebn0_db,
            info_bits=payload.info_bits,
        )
    except ValidationError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc