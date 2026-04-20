from fastapi import APIRouter

from app.api.schemas.mask import MaskRequest, MaskResponse
from app.domain.services.mask_service import build_mask

router = APIRouter()


@router.post("/construct", response_model=MaskResponse)
def construct_mask_endpoint(request: MaskRequest):
    result = build_mask(request)
    return result