from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.home import router as home_router
from app.api.routes.theory import router as theory_router
from app.api.routes.mask import router as mask_router
from app.api.routes.encoder import router as encoder_router
from app.api.routes.decoder import router as decoder_router
from app.api.routes.ber import router as ber_router
from app.api.routes.polarization import router as polarization_router
from app.api.routes.auth import router as auth_router
from app.domain.services.auth_service import init_auth_db


app = FastAPI(
    title="PolarLab API",
    version="1.0.0",
    description="Backend API for Polar Codes educational lab",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
init_auth_db()

app.include_router(home_router, tags=["Home"])
app.include_router(theory_router, prefix="/api/theory", tags=["Theory"])
app.include_router(mask_router, prefix="/api/mask", tags=["Mask"])
app.include_router(encoder_router, prefix="/api/encoder", tags=["Encoder"])
app.include_router(decoder_router, prefix="/api/decoder", tags=["Decoder"])
app.include_router(ber_router, prefix="/api/ber", tags=["BER"])
app.include_router(polarization_router, prefix="/api/polarization", tags=["Polarization"])