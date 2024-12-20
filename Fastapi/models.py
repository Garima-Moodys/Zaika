from sqlalchemy import JSON,Column, ForeignKey, Integer, String,Text,DECIMAL,Date
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True,index=True)
    first_name=Column(String,nullable=False)
    last_name=Column(String)
    email = Column(String, unique=True,nullable=False)
    hashed_password = Column(String,nullable=False)
    
    bookings = relationship("Booking", back_populates="user",cascade="all,delete-orphan")
    orders = relationship("Orders", back_populates="user",cascade="all,delete-orphan")
    cart_items = relationship("Cart", back_populates="user",cascade="all,delete-orphan")
    reviews = relationship("Reviews", back_populates="user",cascade="all,delete-orphan")


class ContactMessage(Base):
    __tablename__ = 'contact_messages'
    
    message_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)


class MenuItem(Base):
    __tablename__ = 'menu_items'
    
    item_id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String(100), unique=True,nullable=False)
    price = Column(DECIMAL(10, 2),default=20)

    cart_items = relationship("Cart", back_populates="menu_item")


class Cart(Base):
    __tablename__ = 'cart'
    
    cart_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    item_id = Column(Integer, ForeignKey('menu_items.item_id'))
    quantity = Column(Integer,default=1)
    
    user = relationship("User", back_populates="cart_items")
    menu_item = relationship("MenuItem", back_populates="cart_items")


class Booking(Base):
    __tablename__ = 'bookings'
    
    booking_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    phone_number = Column(String(20),nullable=False)
    email = Column(String(100), nullable=False)
    number_of_members = Column(Integer, nullable=False)
    booking_date = Column(Date, nullable=False)
    
    user = relationship("User", back_populates="bookings")

class Orders(Base):
    __tablename__ = 'orders'

    order_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    items=Column(JSON,nullable=False)
    order_date = Column(Date, nullable=False)
    amount=Column(Integer)
    payment_mode=Column(String)

    user = relationship("User", back_populates="orders")


class Reviews(Base):
    __tablename__='reviews'

    review_id=Column(Integer,primary_key=True,index=True)
    stars=Column(Integer,nullable=False)
    description=Column(String,nullable=False)
    user_id=Column(Integer,ForeignKey('users.user_id'))

    user = relationship("User", back_populates="reviews")
