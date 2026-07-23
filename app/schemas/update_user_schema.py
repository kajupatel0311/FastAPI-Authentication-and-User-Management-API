from typing import Optional

from pydantic import BaseModel, EmailStr


class UpdateUser(BaseModel):

    name: Optional[str] = None

    email: Optional[EmailStr] = None

    role: Optional[str] = None

    