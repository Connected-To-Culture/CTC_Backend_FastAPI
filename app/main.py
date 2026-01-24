from fastapi import FastAPI
from fastapi.params import Body

from app.routers import admin, vendor

app = FastAPI()

app.include_router(admin.router)
app.include_router(vendor.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}

