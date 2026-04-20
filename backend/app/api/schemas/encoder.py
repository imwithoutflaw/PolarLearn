from pydantic import BaseModel
from typing import List


class EncoderRequest(BaseModel):
    N: int
    K: int
    info_bits: List[int]


class EncoderResponse(BaseModel):
    u_vector: List[int]
    codeword: List[int]
    stages: List
    explanation: str