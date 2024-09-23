from typing import Annotated
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from starlette import status
from sqlalchemy.orm import Session
from models import MenuItem
from database import SessionLocal

router=APIRouter(prefix='/menu',tags=['menu'])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency=Annotated[Session,Depends(get_db)]


@router.get('/',status_code=status.HTTP_200_OK)
async def getMenuItems(db:db_dependency):
    items=db.query(MenuItem).all()
    return items


class NewItem(BaseModel):
    item_name:str
    price:float|None=None

    
@router.post('/newitem',status_code=status.HTTP_201_CREATED)
async def addMenuItems(db:db_dependency,item:NewItem):
    new_item=MenuItem(**item.model_dump())
    db.add(new_item)
    db.commit()



# @router.delete('/del',status_code=status.HTTP_204_NO_CONTENT)
# async def deleteItems(db:db_dependency):
#     db.query(MenuItem).delete()
#     db.commit()