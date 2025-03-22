from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.member import Member as MemberModel
from app.schemas.member import Member, MemberCreate, MemberUpdate

router = APIRouter()


@router.post("/", response_model=Member, status_code=201)
def create_member(member: MemberCreate, db: Session = Depends(get_db)):
    """Create a new member."""
    # Check if email already exists
    db_member = db.query(MemberModel).filter(MemberModel.email == member.email).first()
    if db_member:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new member
    db_member = MemberModel(**member.model_dump())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member


@router.get("/", response_model=List[Member])
def get_members(
    skip: int = 0, 
    limit: int = 100, 
    search: Optional[str] = Query(None, description="Search by name or email"), 
    db: Session = Depends(get_db)
):
    """Get all members with optional pagination and search."""
    query = db.query(MemberModel)
    
    # Apply search if provided
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (MemberModel.first_name.ilike(search_term)) | 
            (MemberModel.last_name.ilike(search_term)) | 
            (MemberModel.email.ilike(search_term))
        )
    
    # Apply pagination
    members = query.offset(skip).limit(limit).all()
    return members


@router.get("/{member_id}", response_model=Member)
def get_member(member_id: int, db: Session = Depends(get_db)):
    """Get a specific member by ID."""
    member = db.query(MemberModel).filter(MemberModel.id == member_id).first()
    if member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    return member


@router.put("/{member_id}", response_model=Member)
def update_member(member_id: int, member_update: MemberUpdate, db: Session = Depends(get_db)):
    """Update a member's information."""
    db_member = db.query(MemberModel).filter(MemberModel.id == member_id).first()
    if db_member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    
    # Update only provided fields
    update_data = member_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_member, key, value)
    
    db.commit()
    db.refresh(db_member)
    return db_member


@router.delete("/{member_id}", status_code=204)
def delete_member(member_id: int, db: Session = Depends(get_db)):
    """Delete a member."""
    db_member = db.query(MemberModel).filter(MemberModel.id == member_id).first()
    if db_member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    
    db.delete(db_member)
    db.commit()
    return None 