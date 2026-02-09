from .database import Base
from sqlalchemy import TIMESTAMP, Column, ForeignKey, Integer, String,Boolean, text,Float
from sqlalchemy.orm import relationship

class Products(Base) : 
    __tablename__ = "products"

    id = Column(Integer, primary_key = True, nullable = False,index=True)
    name = Column(String, nullable = False)
    #vendor_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable = False)
    description = Column(String, nullable = True) 
    price_per_unit = Column(Float, nullable = False)
    unit = Column(String, nullable = False) #-- kg, piece, bunch        
    category = Column(String, nullable = False) #-- vegetables, fruits, dairy, etc.
    created_at = Column(TIMESTAMP(timezone = 'True'), server_default = text('now()'),nullable = False)
    updated_at = Column(TIMESTAMP(timezone = 'True'), nullable = True)     
    #vendor = relationship("User")

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, nullable=False,index=True)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    role = Column(String, nullable=False)  # vendor, customer, admin
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)
    updated_at = Column(TIMESTAMP(timezone=True), nullable=True)


class Inventory(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True, nullable=False,index=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, nullable=False)
    last_restocked = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)
    product = relationship("Products")    


class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, nullable=False,index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    address = Column(String, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)
    user = relationship("User")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, nullable=False,index=True)
    customer_id = Column(Integer, ForeignKey("customers.id", ondelete="CASCADE"), nullable=False)
    total_amount = Column(Float, nullable=False)
    status = Column(String, nullable=False)  # pending, completed, cancelled
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)
    customer = relationship("Customer")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, nullable=False,index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    order = relationship("Order")
    product = relationship("Products")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, nullable=False,index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String, nullable=False)  # pending, completed, failed
    payment_method = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)
    order = relationship("Order")


class FarmerMarketEvent(Base):
    __tablename__ = "farmer_market_events"

    id = Column(Integer, primary_key=True, nullable=False,index=True)
    vendor_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    event_name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    event_date = Column(TIMESTAMP(timezone=True), nullable=False)
    location = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)
    vendor = relationship("User")    


