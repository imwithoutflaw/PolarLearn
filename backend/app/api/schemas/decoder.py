from pydantic import BaseModel, Field


class DecoderRequest(BaseModel):
    N: int = Field(..., description="Code length")
    llr: list[float] = Field(..., description="Log-likelihood ratios")
    mask: list[int] = Field(..., description="Binary mask: 1 for info bit, 0 for frozen bit")


class DecodeStep(BaseModel):
    step_type: str = Field(..., description="Type of step: leaf_decision or combine")
    offset: int = Field(..., description="Offset of current node in the decoding tree")
    size: int = Field(..., description="Current subtree size")
    bit_index: int | None = Field(default=None, description="Bit index for leaf decision")
    role: str | None = Field(default=None, description="Bit role: info or frozen")
    llr_value: float | None = Field(default=None, description="LLR value used for decision")
    decision: int | None = Field(default=None, description="Decoded bit decision at leaf")
    left_bits: list[int] | None = Field(default=None, description="Decoded left subtree bits")
    right_bits: list[int] | None = Field(default=None, description="Decoded right subtree bits")
    combined_bits: list[int] | None = Field(default=None, description="Combined subtree bits")


class DecoderResponse(BaseModel):
    estimated_bits: list[int] = Field(..., description="Estimated information bits")
    steps: list[DecodeStep] = Field(..., description="Structured step-by-step decoding trace")