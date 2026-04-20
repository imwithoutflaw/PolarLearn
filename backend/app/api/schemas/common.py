from pydantic import BaseModel, Field


class MessageResponse(BaseModel):
    message: str = Field(..., description="Human-readable response message")