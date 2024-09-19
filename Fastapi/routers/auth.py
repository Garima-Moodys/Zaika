from datetime import datetime, timedelta, timezone
from fastapi import APIRouter,Depends,HTTPException
from pydantic import BaseModel,EmailStr
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm,OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import jwt,JWTError
from sqlalchemy.orm import Session
from starlette import status
from database import SessionLocal
from models import User

router=APIRouter(prefix='/auth',tags=['auth'])

SECRET_KEY = "34cef05d2e68c3034f000bc942c6037a5c587620e2b5c14698c5f54537ec2ea5"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme=OAuth2PasswordBearer(tokenUrl="auth/token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]

def create_access_token(email:EmailStr,user_id:int, expires_delta: timedelta | None = None):
    to_encode = {'sub':email,'id':user_id}
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token:Annotated[str,Depends(oauth2_scheme)]):
    try:
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        email:EmailStr=payload.get('sub')
        user_id:int=payload.get('id')
        if email is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate")
        return {'email':email,'id':user_id}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate")


@router.post('/token')
async def login_for_access_token(formdata:Annotated[OAuth2PasswordRequestForm,Depends()],db:db_dependency):
    user_present=db.query(User).filter(User.email==formdata.username).first()
    if(not user_present):
        raise HTTPException(status_code=400,detail="Incorrect email or password")
    
    check=pwd_context.verify(formdata.password, user_present.hashed_password)
    if(not check):
        raise HTTPException(status_code=400,detail="Incorrect email or password")
    token=create_access_token(user_present.email,user_present.user_id)
    return {"access_token":token,"token_type":"bearer"}



class CreateUserRequest(BaseModel):
    first_name:str
    last_name:str|None=None
    email:EmailStr
    password:str

@router.post('/',status_code=status.HTTP_201_CREATED)
async def create_user(create_user_request:CreateUserRequest,db:db_dependency):
    findUser=db.query(User).filter(User.email==create_user_request.email).first()
    if findUser:
        raise HTTPException(status_code=400,detail="User already exist")
    create_user_model=User(first_name=create_user_request.first_name,
                           last_name=create_user_request.last_name,
                           email=create_user_request.email,
                           hashed_password=pwd_context.hash(create_user_request.password))
    db.add(create_user_model)
    db.commit()








    

