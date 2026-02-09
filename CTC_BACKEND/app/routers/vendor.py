from app.schemas import ProductBase, Product
from fastapi import APIRouter


router = APIRouter(
    prefix="/vendor",
    tags=["vendor"])




