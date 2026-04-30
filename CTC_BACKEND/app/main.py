from itertools import product
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Body
from fastapi import FastAPI, Response, status,HTTPException,Depends,APIRouter
from typing import List

from app import schemas
#from app.schemas import ProductBase, Product  , UserBase, User

from app.routers import admin, vendor,product,user,auth

import psycopg2
from psycopg2.extras import  RealDictCursor;
import time

from sqlalchemy.orm import Session
from . import models
from .database import engine,get_db


#To create all the models
models.Base.metadata.create_all(bind= engine)

app = FastAPI()

origins = [
    "http://localhost:3000",  # React app
    "http://127.0.0.1:3000",
    # add your frontend URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # allowed origins
    allow_credentials=True,
    allow_methods=["*"],            # allow all HTTP methods
    allow_headers=["*"],            # allow all headers
)


app.include_router(admin.router)
app.include_router(vendor.router)
app.include_router(product.router)
app.include_router(user.router)
app.include_router(auth.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}


@app.get("/sqlalchemy")
def test_post(db : Session = Depends(get_db)) :
  products = db.query(models.Products).all()
  return {"data": products}



"""
CRITICAL ENDPOINT FOR FRONTEND FUNCTIONALITY
=============================================

This /getInventory/{product_id} endpoint is ESSENTIAL for the AddToCartModal component
in the frontend to function properly.

WHY IT'S IMPORTANT:
- The frontend AddToCartModal fetches inventory data to display stock levels
- Without this endpoint, products cannot show accurate availability
- Cart functionality depends on knowing if items are in stock
- Unit information (lbs, kg, etc.) is provided by this endpoint

HOW IT WORKS:
- Accepts product_id as URL parameter
- Queries the Inventory table for the specific product
- Returns inventory data including quantity, in_stock status, and unit
- Falls back to default values if no inventory record exists
- Used by: CTC_WEB_FRONTEND/src/modals/AddToCartModal.jsx

DO NOT REMOVE THIS ENDPOINT - Frontend will break without it!
"""

@app.get("/getInventory/{product_id}")
def get_inventory(product_id: int, db: Session = Depends(get_db)):
    inventory = db.query(models.Inventory).filter(models.Inventory.product_id == product_id).first()
    if not inventory:
        # Return default inventory data if none exists
        return {
            "product_id": product_id,
            "quantity": 0,
            "in_stock": False,
            "unit": "unit"
        }
    
    # Get product unit for display
    product = db.query(models.Products).filter(models.Products.id == product_id).first()
    unit = product.unit if product else "unit"
    
    return {
        "product_id": inventory.product_id,
        "quantity": inventory.quantity,
        "in_stock": inventory.quantity > 0,
        "unit": unit,
        "last_restocked": inventory.last_restocked
    }
    