from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class UpdateProfile(BaseModel):

    name: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=50
    )

    email: Optional[EmailStr] = None

    class Config:
        extra = "forbid"

        