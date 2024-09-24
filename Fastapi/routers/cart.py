from typing import Annotated
from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy import and_
from sqlalchemy.orm import Session
from starlette import status
from database import SessionLocal
from .auth import get_current_user
from models import Cart,MenuItem

router=APIRouter(tags=['cart'],prefix='/cart')

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]
user_dependency=Annotated[dict,Depends(get_current_user)]

@router.post('/addTocart/{item_name}',status_code=status.HTTP_201_CREATED)
async def addTocart(user:user_dependency,db:db_dependency,item_name:str):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="could not validate")
    new_item=db.query(MenuItem).filter(MenuItem.item_name==item_name).first()
    if new_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    user_id=user.get('id')
    item=Cart(user_id=user_id,item_id=new_item.item_id)
    db.add(item)
    db.commit()


@router.put('/updateCart/{item_id}/{quantity}',status_code=status.HTTP_204_NO_CONTENT)
async def updateCart(user:user_dependency,db:db_dependency,item_id:int,quantity:int):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="could not validate")
    user_id=user.get('id')
    cart_item=db.query(Cart).filter(
        and_(
            user_id==Cart.user_id,
            item_id==Cart.item_id
        )).first()
    if cart_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found") 
    cart_item.quantity=quantity
    db.commit()

@router.delete('/deleteFromcart/{item_id}',status_code=status.HTTP_204_NO_CONTENT)
async def deleteFromCart(user:user_dependency,db:db_dependency,item_id:int):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="could not validate")
    cart_item=db.query(Cart).filter(
        and_(
            user.get('id')==Cart.user_id,
            item_id==Cart.item_id
        )).first()
    if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found") 
    db.delete(cart_item)
    db.commit()

@router.get('/allCartitems',status_code=status.HTTP_200_OK)
async def getAllItems(user:user_dependency,db:db_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="could not validate")
    cart_items=(db.query(Cart,MenuItem).join(MenuItem,Cart.item_id==MenuItem.item_id).filter(user.get('id')==Cart.user_id).all())
    result=[]
    for cart_item,menu_item in cart_items:
        result.append({'item_id':menu_item.item_id,'item_name':menu_item.item_name,'price':menu_item.price,'quantity':cart_item.quantity})
    return result

@router.delete('/deleteCartitems',status_code=status.HTTP_204_NO_CONTENT)
async def deleteAllItems(user:user_dependency,db:db_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="could not validate")
    db.query(Cart).filter(user.get('id')==Cart.user_id).delete()
    db.commit()