from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import mask, encoder, decoder

app = FastAPI(
    title="PolarLab API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(mask.router, prefix="/api/mask", tags=["Mask"])
app.include_router(encoder.router, prefix="/api/encoder", tags=["Encoder"])
app.include_router(decoder.router, prefix="/api/decoder", tags=["Decoder"])


@app.get("/")
def root():
    return {"message": "PolarLab API is running"}