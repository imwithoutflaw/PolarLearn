from pydantic import BaseModel, Field


class EncoderRequest(BaseModel):
    N: int = Field(..., description="Code length")
    K: int = Field(..., description="Number of information bits")
    info_bits: list[int] = Field(..., description="Input information bits")


class EncoderResponse(BaseModel):
    u_vector: list[int] = Field(..., description="Input vector u before polar transform")
    codeword: list[int] = Field(..., description="Encoded polar codeword")
    stages: list[list[int] | str] = Field(..., description="Intermediate encoding stages for visualization")
    explanation: str = Field(..., description="Short explanation of encoding steps")