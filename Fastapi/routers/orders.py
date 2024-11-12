from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from datetime import date
from models import Orders
from database import SessionLocal
from .auth import get_current_user

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()


router=APIRouter(tags=['orders'],prefix='/orders')

db_dependency=Annotated[Session,Depends(get_db)]
user_dependency=Annotated[dict,Depends(get_current_user)]

class Item(BaseModel):
    item_name:str
    quantity:int

class CreateOrder(BaseModel):
    items:list[Item]
    date:date
    amount:int
    mode:str


@router.post('/addOrder',status_code=status.HTTP_201_CREATED)
async def createOrder(db:db_dependency,user:user_dependency,order:CreateOrder):
    if not user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED,detail="Not Authorized")
    items_data = [{"item_name": item.item_name, "quantity": item.quantity} for item in order.items]
    create_order=Orders(user_id=user.get('id'),items=items_data,order_date=order.date,amount=order.amount,payment_mode=order.mode)
    db.add(create_order)
    db.commit()

@router.get('/allOrders',status_code=status.HTTP_200_OK)
async def getAllOrders(db:db_dependency):
    orders=db.query(Orders).all()
    return orders

@router.get('/',status_code=status.HTTP_200_OK)
async def getOrders(db:db_dependency,user:user_dependency):
    if not user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED,detail="Not Authorized")
    orders=db.query(Orders).filter(user.get('id')==Orders.user_id).all()
    return orders

@router.delete('/delete',status_code=status.HTTP_204_NO_CONTENT)
async def deleteOrders(db:db_dependency,user:user_dependency):
    if not user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED,detail="Not Authorized")
    db.query(Orders).filter(user.get('id')==Orders.user_id).delete()
    db.commit()