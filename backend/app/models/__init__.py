from app.models.patient import Patient
from app.models.benefit import Benefit
from app.models.member import Member

# For database creation
from app.core.database import Base
from app.core.database import engine

# Create all tables
Base.metadata.create_all(bind=engine)

# Export all models
__all__ = ["Patient", "Benefit", "Member"]

# Note: Don't import Base here to avoid circular imports
