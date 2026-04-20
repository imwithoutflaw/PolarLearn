from pydantic import BaseModel, Field


class BerRequest(BaseModel):
    N: int = Field(..., description="Code length")
    K: int = Field(..., description="Number of information bits")
    design_ebn0_db: float = Field(..., description="Design Eb/N0 in dB for mask construction")
    ebn0_points_db: list[float] = Field(..., description="Eb/N0 points to simulate")
    frames: int = Field(..., description="Number of random frames per SNR point")


class BerPointResponse(BaseModel):
    ebn0_db: float = Field(..., description="Simulated Eb/N0 point")
    ber: float = Field(..., description="Bit error rate")
    fer: float = Field(..., description="Frame error rate")
    bit_errors: int = Field(..., description="Total number of bit errors")
    frame_errors: int = Field(..., description="Total number of frame errors")
    total_bits: int = Field(..., description="Total decoded information bits")
    total_frames: int = Field(..., description="Total simulated frames")


class BerResponse(BaseModel):
    N: int = Field(..., description="Code length")
    K: int = Field(..., description="Number of information bits")
    design_ebn0_db: float = Field(..., description="Design Eb/N0 in dB used for mask construction")
    results: list[BerPointResponse] = Field(..., description="BER/FER results for each Eb/N0 point")
    explanation: str = Field(..., description="Short explanation of simulation settings")