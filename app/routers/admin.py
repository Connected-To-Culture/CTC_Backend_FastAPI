from app.schemas import FarmerMarketEventBase
from fastapi import APIRouter

router = APIRouter(
    prefix="/admin",
    tags=["admin"])

@router.post("/createFarmersMarketEvent")
def create_event(Event:FarmerMarketEventBase):
    print(Event)
    print(Event.model_dump()) # Use model_dump() to convert Pydantic model to dict
    return {"data" :Event}
   
