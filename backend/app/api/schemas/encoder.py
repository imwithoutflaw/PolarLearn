from pydantic import BaseModel, Field


class EncoderRequest(BaseModel):
    N: int = Field(..., description="Code length")
    K: int = Field(..., description="Number of information bits")
    design_ebn0_db: float = Field(..., description="Design Eb/N0 in dB used for mask construction")
    info_bits: list[int] = Field(..., description="Input information bits")


class EncoderResponse(BaseModel):
    N: int = Field(..., description="Code length")
    K: int = Field(..., description="Number of information bits")
    design_ebn0_db: float = Field(..., description="Design Eb/N0 in dB")
    mask: list[int] = Field(..., description="Binary mask: 1 for info bit, 0 for frozen bit")
    info_positions: list[int] = Field(..., description="Indices of information bit positions")
    frozen_positions: list[int] = Field(..., description="Indices of frozen bit positions")
    u_vector: list[int] = Field(..., description="Input vector u before polar transform")
    codeword: list[int] = Field(..., description="Encoded polar codeword")
    stages: list[list[int]] = Field(..., description="Intermediate encoding stages for visualization")
    explanation: str = Field(..., description="Short explanation of encoding steps")