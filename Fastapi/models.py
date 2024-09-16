from sqlalchemy import Boolean, Column, ForeignKey, Integer, String,Text,DECIMAL,Date
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True,index=True)
    first_name=Column(String,nullable=False)
    last_name=Column(String)
    email = Column(String, unique=True,nullable=False)
    hashed_password = Column(String,nullable=False)
    
    contact_messages = relationship("ContactMessage", back_populates="user")
    bookings = relationship("Booking", back_populates="user")
    cart_items = relationship("Cart", back_populates="user")


class ContactMessage(Base):
    __tablename__ = 'contact_messages'
    
    message_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    name = Column(String(100))
    email = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)

    user = relationship("User", back_populates="contact_messages")


class MenuItem(Base):
    __tablename__ = 'menu_items'
    
    item_id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String(100), nullable=False)
    price = Column(DECIMAL(10, 2),default=20, nullable=False)

    cart_items = relationship("Cart", back_populates="menu_item")


class Cart(Base):
    __tablename__ = 'cart'
    
    cart_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    item_id = Column(Integer, ForeignKey('menu_items.item_id'))
    quantity = Column(Integer, default=1, nullable=False)
    
    user = relationship("User", back_populates="cart_items")
    menu_item = relationship("MenuItem", back_populates="cart_items")


class Booking(Base):
    __tablename__ = 'bookings'
    
    booking_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    phone_number = Column(String(20))
    email = Column(String(100), nullable=False)
    number_of_members = Column(Integer, nullable=False)
    booking_date = Column(Date, nullable=False)
    
    user = relationship("User", back_populates="bookings")