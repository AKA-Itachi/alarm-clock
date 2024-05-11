from fastapi import APIRouter, HTTPException
from models.alarm import Alarm
from bson import ObjectId

router = APIRouter()


# Create alarm endpoint
@router.post("/alarms")
async def create_alarm(alarm: Alarm):
    alarm_data = alarm.dict()
    result = Alarm.insert_one(alarm_data)
    return {"id": str(result.inserted_id)}


# Get alarms endpoint
@router.get("/alarms")
async def get_alarms():
    alarms = list(Alarm.find())
    return alarms


# Update alarm endpoint
@router.put("/alarms/{alarm_id}")
async def update_alarm(alarm_id: str, alarm: Alarm):
    alarm_data = alarm.dict()
    result = Alarm.update_one({"_id": ObjectId(alarm_id)}, {"$set": alarm_data})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Alarm not found")
    return alarm_data


# Delete alarm endpoint
@router.delete("/alarms/{alarm_id}")
async def delete_alarm(alarm_id: str):
    result = Alarm.delete_one({"_id": ObjectId(alarm_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Alarm not found")
    return {"message": "Alarm deleted successfully"}
