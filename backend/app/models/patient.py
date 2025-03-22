from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.types import JSON
from sqlalchemy.sql.sqltypes import DateTime

from app.core.database import Base

class Patient(Base):
    __tablename__ = "patients"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)
    
    # SDOH factors (can be extended)
    income_level = Column(String)
    housing_status = Column(String)
    employment_status = Column(String)
    education_level = Column(String)
    transportation_access = Column(Boolean, default=True)
    
    # Risk score (calculated based on SDOH factors)
    risk_score = Column(Integer, default=0)
    
    # Metadata
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Additional data (flexible JSON storage)
    additional_data = Column(JSON, default=dict)
    
    # Relationships
    # benefits = relationship("Benefit", secondary="patient_benefits")
    
    def __repr__(self):
        return f"<Patient {self.first_name} {self.last_name}>" 