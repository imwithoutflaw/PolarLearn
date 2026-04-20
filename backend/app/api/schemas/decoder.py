from pydantic import BaseModel, Field


class DecoderRequest(BaseModel):
    N: int = Field(..., description="Code length")
    llr: list[float] = Field(..., description="Log-likelihood ratios")
    mask: list[int] = Field(..., description="Binary mask: 1 for info bit, 0 for frozen bit")


class DecoderResponse(BaseModel):
    estimated_bits: list[int] = Field(..., description="Estimated information bits")
    steps: list[str] = Field(..., description="Step-by-step decoding trace")