from pydantic import BaseModel, Field


class MaskRequest(BaseModel):
    N: int = Field(..., description="Code length")
    K: int = Field(..., description="Number of information bits")
    design_ebn0_db: float = Field(..., description="Design Eb/N0 in dB")


class MaskResponse(BaseModel):
    N: int = Field(..., description="Code length")
    K: int = Field(..., description="Number of information bits")
    rate: float = Field(..., description="Code rate K/N")
    info_positions: list[int] = Field(..., description="Indices of information bit positions")
    frozen_positions: list[int] = Field(..., description="Indices of frozen bit positions")
    mask: list[int] = Field(..., description="Binary mask: 1 for info bit, 0 for frozen bit")
    explanation: str = Field(..., description="Short explanation of the result")