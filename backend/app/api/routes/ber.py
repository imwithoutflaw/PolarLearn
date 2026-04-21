from fastapi import APIRouter, HTTPException

from app.api.schemas.ber import BerCompareRequest, BerCompareResponse, BerRequest, BerResponse
from app.core.exceptions import ValidationError
from app.domain.services.ber_service import build_ber_compare_response, build_ber_response

router = APIRouter()


@router.post("/simulate", response_model=BerResponse)
def simulate_ber(payload: BerRequest):
    try:
        return build_ber_response(
            N=payload.N,
            K=payload.K,
            design_ebn0_db=payload.design_ebn0_db,
            ebn0_points_db=payload.ebn0_points_db,
            frames=payload.frames,
        )
    except ValidationError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@router.post("/compare", response_model=BerCompareResponse)
def compare_ber(payload: BerCompareRequest):
    try:
        return build_ber_compare_response(
            codes=payload.codes,
            design_ebn0_db=payload.design_ebn0_db,
            ebn0_points_db=payload.ebn0_points_db,
            frames=payload.frames,
        )
    except ValidationError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc