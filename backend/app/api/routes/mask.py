from fastapi import APIRouter, HTTPException

from app.api.schemas.mask import MaskRequest, MaskResponse
from app.core.exceptions import ValidationError
from app.domain.services.mask_service import build_mask_response

router = APIRouter()


@router.post("/construct", response_model=MaskResponse)
def construct_mask_route(payload: MaskRequest):
    try:
        return build_mask_response(
            N=payload.N,
            K=payload.K,
            design_ebn0_db=payload.design_ebn0_db,
        )
    except ValidationError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc