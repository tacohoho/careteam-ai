from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import SECRET_KEY, ALGORITHM
from app.models.member import Member
from app.schemas.auth import TokenPayload

# OAuth2 scheme for token retrieval
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
) -> Member:
    """
    Get the current user from the token.
    
    Raises an HTTPException if the token is invalid or the user doesn't exist.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: Optional[str] = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        token_data = TokenPayload(sub=int(user_id), exp=payload.get("exp"))
    except JWTError:
        raise credentials_exception
    
    user = db.query(Member).filter(Member.id == token_data.sub).first()
    if user is None:
        raise credentials_exception
    
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Inactive user")
    
    return user

def get_current_active_user(current_user: Member = Depends(get_current_user)) -> Member:
    """
    Get the current active user.
    
    Raises an HTTPException if the user is not active.
    """
    if not current_user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Inactive user")
    return current_user

def get_current_admin_user(current_user: Member = Depends(get_current_user)) -> Member:
    """
    Get the current admin user.
    
    Raises an HTTPException if the user is not an admin.
    """
    if not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    return current_user 