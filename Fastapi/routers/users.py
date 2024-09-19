from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel,Field
from database import SessionLocal
from .auth import get_current_user
from passlib.context import CryptContext
from models import User
from starlette import status

router=APIRouter(prefix='/users',tags=['users'])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]
user_dependency=Annotated[dict,Depends(get_current_user)]
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.get('/',status_code=status.HTTP_200_OK)
async def get_user(user:user_dependency,db:db_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate")
    current_user=db.query(User).filter(user.get('id')==User.user_id).first()
    return current_user

class UserVerification(BaseModel):
    current_pwd:str
    new_pwd:str

@router.put('/password',status_code=status.HTTP_204_NO_CONTENT)
async def change_password(user:user_dependency,db:db_dependency,user_verification:UserVerification):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate")
    current_user=db.query(User).filter(user.get('id')==User.user_id).first()
    if not pwd_context.verify(user_verification.current_pwd,current_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Error on password change")
    current_user.hashed_password=pwd_context.hash(user_verification.new_pwd)
    db.add(current_user)
    db.commit()


@router.delete('/delete',status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user:user_dependency,db:db_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate")
    current_user=db.query(User).filter(user.get('id')==User.user_id).first()
    db.delete(current_user)
    db.commit()

@router.get('/details')
async def getAllUsers(db:db_dependency):
    return db.query(User).all()

@router.get('/details/delete')
async def deleteAllUsers(db:db_dependency):
    db.query(User).delete()
    db.commit()