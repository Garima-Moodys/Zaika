from fastapi import FastAPI,Depends,HTTPException
from typing import Annotated
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, users, contact, booking, cart

app = FastAPI()

origins=[
    'http://localhost:3000',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

models.Base.metadata.create_all(bind=engine)
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(contact.router)
app.include_router(booking.router)
app.include_router(cart.router)


