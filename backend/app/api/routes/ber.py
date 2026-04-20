from fastapi import APIRouter

router = APIRouter()


@router.post("/simulate")
def simulate_ber():
    return {
        "message": "BER endpoint placeholder",
    }