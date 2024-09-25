from datetime import date
from fastapi import APIRouter,Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy import and_
from starlette import status
from database import SessionLocal
from .auth import get_current_user
from sqlalchemy.orm import Session
from typing import Annotated
from models import Booking

router=APIRouter(tags=['booking'],prefix='/booking')

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]
user_dependency=Annotated[dict,Depends(get_current_user)]

MAX_BOOKING_AVAILABLE=7

class BookingData(BaseModel):
    phone_number:str
    email:EmailStr
    members:int 
    date:date

@router.post('/addBooking',status_code=status.HTTP_201_CREATED)
async def addBooking(user:user_dependency,db:db_dependency,booking:BookingData):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail='User not authorised')
    capacity=db.query(Booking).filter(Booking.booking_date==booking.date).count()
    if(capacity==MAX_BOOKING_AVAILABLE):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Sorry! Maximum bookings reached for this date")
    booking_allot=Booking(user_id=user.get('id'),phone_number=booking.phone_number,email=booking.email,number_of_members=booking.members,booking_date=booking.date)
    db.add(booking_allot)
    db.commit()

@router.delete('/delete/{booking_id}',status_code=status.HTTP_204_NO_CONTENT)
async def delete_booking(user:user_dependency,db:db_dependency,booking_id:int):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail='User not authorised')
    booking=db.query(Booking).filter(
        and_(
            user.get('id')==Booking.user_id,
            booking_id==Booking.booking_id
        )).first()
    db.delete(booking)
    db.commit()

@router.get('/',status_code=status.HTTP_200_OK)
async def show_bookings(user:user_dependency,db:db_dependency):
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail='User not authorised')
    bookings=db.query(Booking).filter(
        and_(
            Booking.user_id==user.get('id'),
            Booking.booking_date>=date.today()
            )).all()
    return bookings

