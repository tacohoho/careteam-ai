from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.types import JSON
from sqlalchemy.sql.sqltypes import DateTime

from app.core.database import Base

# Association table for patient-benefit relationship
patient_benefits = Table(
    "patient_benefits",
    Base.metadata,
    Column("patient_id", Integer, ForeignKey("patients.id")),
    Column("benefit_id", Integer, ForeignKey("benefits.id")),
    Column("applied_date", DateTime, default=func.now()),
    Column("status", String, default="pending"),  # pending, approved, rejected
)

class Benefit(Base):
    __tablename__ = "benefits"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=False)
    provider = Column(String, nullable=False)
    category = Column(String, index=True)  # healthcare, housing, financial, etc.
    
    # Application details
    application_process = Column(Text)
    application_url = Column(String)
    contact_phone = Column(String)
    contact_email = Column(String)
    
    # Eligibility criteria (stored as JSON for flexibility)
    eligibility_criteria = Column(JSON, nullable=False, default=dict)
    
    # Document requirements
    required_documents = Column(JSON, default=list)
    
    # Metadata
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    is_active = Column(Boolean, default=True)
    
    # Additional data
    additional_data = Column(JSON, default=dict)
    
    # Relationships
    # patients = relationship("Patient", secondary=patient_benefits, back_populates="benefits")
    
    def __repr__(self):
        return f"<Benefit {self.name}>" 