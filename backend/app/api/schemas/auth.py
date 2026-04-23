from pydantic import BaseModel, Field


class RegisterRequest(BaseModel):
    email: str
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6, max_length=128)


class LoginRequest(BaseModel):
    email: str
    password: str = Field(..., min_length=6, max_length=128)


class UserResponse(BaseModel):
    id: int
    email: str
    username: str


class AuthResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse