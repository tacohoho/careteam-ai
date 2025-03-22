from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.deps import get_current_user
from app.services.auth_service import authenticate_user, register_new_user, create_tokens_for_user
from app.schemas.auth import Token, LoginRequest, RegisterRequest
from app.schemas.member import Member

router = APIRouter()

@router.post("/login", response_model=Token)
def login_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    tokens = create_tokens_for_user(user.id)
    return Token(
        access_token=tokens["access_token"], 
        refresh_token=tokens["refresh_token"]
    )

@router.post("/login/email", response_model=Token)
def login_with_email(login_data: LoginRequest, db: Session = Depends(get_db)):
    """
    Login with email and password, get an access token for future requests.
    """
    user = authenticate_user(db, login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    tokens = create_tokens_for_user(user.id)
    return Token(
        access_token=tokens["access_token"], 
        refresh_token=tokens["refresh_token"]
    )

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(user_data: RegisterRequest, db: Session = Depends(get_db)):
    """
    Register a new user and get an access token.
    """
    # Check if the user already exists
    existing_user = db.query(Member).filter(Member.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    
    # Create the new user
    new_user = register_new_user(db, user_data)
    
    # Create tokens for the new user
    tokens = create_tokens_for_user(new_user.id)
    return Token(
        access_token=tokens["access_token"],
        refresh_token=tokens["refresh_token"]
    )

@router.get("/me", response_model=Member)
def get_current_user_info(current_user: Member = Depends(get_current_user)):
    """
    Get details about the current user.
    """
    return current_user 