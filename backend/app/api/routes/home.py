from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def root():
    return {
        "message": "Welcome to PolarLab API",
        "docs": "/docs",
        "status": "ok",
    }