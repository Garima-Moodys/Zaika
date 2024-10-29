from fastapi import FastAPI
from database import engine
import models
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, users, contact, booking, cart, menu, payment,orders,reviews

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
app.include_router(menu.router)
app.include_router(payment.router)
app.include_router(orders.router)
app.include_router(reviews.router)

