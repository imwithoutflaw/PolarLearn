from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_theory():
    return {
        "section": "theory",
        "message": "Theory endpoint is under construction",
    }