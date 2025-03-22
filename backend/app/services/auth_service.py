from datetime import timedelta
from typing import Optional
from sqlalchemy.orm import Session

from app.models.member import Member
from app.core.security import verify_password, get_password_hash, create_access_token, create_refresh_token
from app.schemas.auth import RegisterRequest

def authenticate_user(db: Session, email: str, password: str) -> Optional[Member]:
    """
    Authenticate a user with email and password.
    
    Returns the member if authentication is successful, otherwise None.
    """
    user = db.query(Member).filter(Member.email == email).first()
    if not user:
        return None
    if not user.hashed_password:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

def register_new_user(db: Session, user_data: RegisterRequest) -> Member:
    """
    Register a new user.
    
    Returns the created member.
    """
    hashed_password = get_password_hash(user_data.password)
    user = Member(
        email=user_data.email,
        hashed_password=hashed_password,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        phone=user_data.phone,
        address=user_data.address,
        is_active=True,
        is_admin=False
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def create_tokens_for_user(user_id: int):
    """
    Create access and refresh tokens for a user.
    
    Returns a dictionary with access_token and refresh_token.
    """
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": str(user_id)}, expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(data={"sub": str(user_id)})
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token
    } 