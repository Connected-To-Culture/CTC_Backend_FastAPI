from typing import Optional,List
from fastapi import FastAPI, Response, status,HTTPException,Depends,APIRouter
from .. import models, oauth2,schemas
from sqlalchemy.orm import Session
from ..database import get_db

from sqlalchemy import func

router = APIRouter(
  prefix = "/products",
  tags = ['Products']
)

@router.get("/getProducts",response_model=List[schemas.Product])
def get_products(db: Session = Depends(get_db),): 
    # cursor.execute("SELECT * FROM products")
    # products = cursor.fetchall()
    products = db.query(models.Products).all()
    #return {"data": products}
    return products

@router.post("/createProduct",status_code=status.HTTP_201_CREATED,response_model=schemas.Product)
def create_product(productBase:schemas.ProductCreate,db: Session = Depends(get_db),user: schemas.User = Depends(oauth2.get_current_user)): 
    #print(productBase)
    #print(productBase.model_dump()) # Use model_dump() to convert Pydantic model to dict
    #return {"data" :productBase}
    # cursor.execute("""INSERT INTO products (name, description, price_per_unit, unit, category) VALUES (%s, %s, %s, %s, %s) RETURNING * """,
    #                 (productBase.name, productBase.description, productBase.price_per_unit, productBase.unit,productBase.category))
    # new_product = cursor.fetchone()   
    #new_product = models.Products(name=productBase.name, description=productBase.description, price_per_unit=productBase.price_per_unit, unit=productBase.unit, category=productBase.category)
    new_product = models.Products(**productBase.model_dump())
    db.add(new_product)    
    db.commit()
    db.refresh(new_product)
    #return {"data": new_product}
    return new_product

@router.get("/getProduct/{id}",response_model=schemas.Product)
def get_product(id:int,db : Session = Depends(get_db)):
    product = db.query(models.Products).filter(models.Products.id == id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Product with id: {id} was not found")
    #return {"data": product}
    return product

@router.delete("/deleteProduct/{id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_product(id:int,db : Session = Depends(get_db),user: schemas.User = Depends(oauth2.get_current_user)):    
    # cursor.execute("DELETE FROM products WHERE id = %s RETURNING *", (str(id),))
    # deleted_product = cursor.fetchone(),
    # connection.commit()
    deleted_product = db.query(models.Products).filter(models.Products.id == id).first()
    if deleted_product == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Product with id: {id} does not exist")
    #deleted_product.delete(synchronize_session=False)
    db.delete(deleted_product)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.put("/updateProduct/{id}",response_model=schemas.Product)
def update_product(id:int, updatedProduct:schemas.ProductUpdate,db : Session = Depends(get_db),user: schemas.User = Depends(oauth2.get_current_user)):
    # cursor.execute("""UPDATE products SET name = %s, description = %s, price_per_unit = %s, unit = %s, category = %s WHERE id = %s RETURNING * """,
    #                (updatedProduct.name, updatedProduct.description, updatedProduct.price_per_unit, updatedProduct.unit, updatedProduct.category, str(id)))
    # updated_product = cursor.fetchone()
    # connection.commit()
    update_product_query= db.query(models.Products).filter(models.Products.id == id)
    updated_product = update_product_query.first()
    if updated_product == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Product with id: {id} does not exist")
    update_product_query.update(updatedProduct.model_dump(),synchronize_session=False)
    db.commit()
    #return {"data": update_product_query.first()}
    return update_product_query.first()

