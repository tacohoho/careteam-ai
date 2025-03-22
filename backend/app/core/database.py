from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from pathlib import Path

# Create database directory if it doesn't exist
database_dir = Path(__file__).resolve().parent.parent.parent.parent / "database"
os.makedirs(database_dir, exist_ok=True)

# Database URL (SQLite)
SQLALCHEMY_DATABASE_URL = f"sqlite:///{database_dir}/careteam.db"

# Create engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Session local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 