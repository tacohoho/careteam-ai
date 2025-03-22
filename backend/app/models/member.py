from sqlalchemy import Column, Integer, String, Date, DateTime, Boolean
from sqlalchemy.sql import func

from app.core.database import Base

class Member(Base):
    __tablename__ = "members"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    date_of_birth = Column(Date, nullable=True)
    address = Column(String)
    
    # Authentication fields
    hashed_password = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    
    # Metadata
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<Member {self.first_name} {self.last_name}>" 