from pydantic import BaseModel
from typing import List, Optional


class MaskRequest(BaseModel):
    N: int
    K: Optional[int] = None
    R: Optional[float] = None
    design_ebn0_db: float


class MaskResponse(BaseModel):
    N: int
    K: int
    rate: float
    info_positions: List[int]
    frozen_positions: List[int]
    mask: List[int]
    explanation: str