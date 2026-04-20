from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_polarization():
    return {
        "message": "Polarization endpoint placeholder",
    }