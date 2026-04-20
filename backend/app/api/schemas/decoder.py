from pydantic import BaseModel
from typing import List


class DecoderRequest(BaseModel):
    N: int
    llr: List[float]
    mask: List[int]


class DecoderResponse(BaseModel):
    estimated_bits: List[int]
    steps: List