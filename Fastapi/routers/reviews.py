from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from starlette import status
from sqlalchemy.orm import Session
from typing import Annotated
from database import SessionLocal
from .auth import get_current_user
from models import Reviews,User

router=APIRouter(tags=['reviews'],prefix='/reviews')

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]
user_dependency=Annotated[dict,Depends(get_current_user)]

@router.get('/',status_code=status.HTTP_200_OK)
def allReviews(db:db_dependency):
    return db.query(Reviews).all()

class UserReview(BaseModel):
    rating:int
    desc:str

@router.post('/addReview',status_code=status.HTTP_201_CREATED)
def addReview(db:db_dependency,user:user_dependency,review:UserReview):
    if(not user):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate")
    new_review=Reviews(stars=review.rating,description=review.desc,user_id=user.get('id'))
    db.add(new_review)
    db.commit()


@router.delete('/deleteReview',status_code=status.HTTP_204_NO_CONTENT)
def deleteReview(db:db_dependency):
    db.query(Reviews).delete()
    db.commit()

    



