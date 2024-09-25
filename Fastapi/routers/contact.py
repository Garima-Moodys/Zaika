from fastapi import APIRouter,Depends
from models import ContactMessage
from database import SessionLocal
from sqlalchemy.orm import Session
from typing import Annotated
from starlette import status
from pydantic import BaseModel, EmailStr

router=APIRouter(tags=['contact'],prefix='/contact')

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]


class ContactData(BaseModel):
    name:str|None=None
    email:EmailStr
    msg:str


@router.post('/',status_code=status.HTTP_201_CREATED)
async def sendmsg(db:db_dependency,contactData:ContactData):
    msg=ContactMessage(name=contactData.name,email=contactData.email,message=contactData.msg)
    db.add(msg)
    db.commit()

@router.get('/allMsgs',status_code=status.HTTP_200_OK)
async def allmsg(db:db_dependency):
    all_msgs=db.query(ContactMessage).all()
    return all_msgs