from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class FarmerMarketEventBase(BaseModel):
    name: str
    description: Optional[str] = None
    location: str
    start_time: datetime
    end_time: datetime
    capacity: int
    vendor_fee: float

class FarmersMarketEventCreate(FarmerMarketEventBase):
    pass

class FarmersMarketEvent(FarmerMarketEventBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class FarmersMarketEventUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    capacity: Optional[int] = None
    vendor_fee: Optional[float] = None

    class Config:
        from_attributes = True


class ProductBase(BaseModel):
        name: str
        #vendor_id: int
        description: Optional[str] = None
        price_per_unit: float
        unit: str #-- kg, piece, bunch
        category: str #-- vegetables, fruits, dairy, etc.

class ProductCreate(ProductBase):
        pass


class Product(ProductBase):
        id: int
        created_at: datetime
        updated_at: Optional[datetime] = None

        class Config:
            from_attributes = True



class ProductUpdate(BaseModel):
        name: Optional[str] = None
        #vendor_id: int
        description: Optional[str] = None
        price_per_unit: Optional[float] = None
        unit: Optional[str] = None #-- kg, piece, bunch
        category: Optional[str] = None

        class Config:
            from_attributes = True


class UserBase(BaseModel):
        username: str
        email: str
        full_name: Optional[str] = None
        password: str
        role: str  # vendor, customer, admin

class User(UserBase):
        id: int
        created_at: Optional[datetime]  = None
        updated_at: Optional[datetime] = None

        class Config:
            from_attributes = True
