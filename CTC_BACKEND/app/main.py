from itertools import product
from fastapi import FastAPI
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



    