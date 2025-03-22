from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class MemberBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str] = None
    date_of_birth: Optional[date] = None
    address: Optional[str] = None


class MemberCreate(MemberBase):
    pass


class MemberUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    date_of_birth: Optional[date] = None
    address: Optional[str] = None


class Member(MemberBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # This replaces orm_mode=True in Pydantic v2 