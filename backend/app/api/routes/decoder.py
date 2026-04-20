from fastapi import APIRouter, HTTPException

from app.api.schemas.decoder import DecoderRequest, DecoderResponse
from app.core.exceptions import ValidationError
from app.domain.services.decoder_service import build_decoder_response

router = APIRouter()


@router.post("/sc-run", response_model=DecoderResponse)
def run_decoder(payload: DecoderRequest):
    try:
        return build_decoder_response(
            N=payload.N,
            llr=payload.llr,
            mask=payload.mask,
        )
    except ValidationError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc