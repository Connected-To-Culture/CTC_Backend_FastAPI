from app.schemas import ProductBase, Product
from fastapi import APIRouter


router = APIRouter(
    prefix="/vendor",
    tags=["vendor"])

@router.post("/createProduct")
def create_product(productBase:ProductBase) :
    print(productBase)
    print(productBase.model_dump()) # Use model_dump() to convert Pydantic model to dict
    return {"data" :productBase}
