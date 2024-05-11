from datetime import datetime
from time import localtime
from pydantic import BaseModel
from typing import Optional

from database.mongodb import connect, get_db_collection


class BaseDBModel(BaseModel):
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        mongo_db = connect()

    @classmethod
    async def get_collection(cls):
        return await get_db_collection(cls.Config.mongo_db, cls.__name__)

    @classmethod
    async def insert_one(cls, **data):
        data["created_at"] = localtime()
        data["updated_at"] = localtime()

        conn = await cls.get_connection()
        return conn.insert_one(data)

    @classmethod
    async def insert_many(cls, data: list):
        for item in data:
            item["created_at"] = localtime()
            item["updated_at"] = localtime()

        conn = await cls.get_connection()
        return conn.insert_many(data)

    @classmethod
    async def update_one(cls, filters, update_data):
        update_data["updated_at"] = localtime()

        conn = await cls.get_connection()
        return conn.update_one(filters, {"$set": update_data})

    @classmethod
    async def update_many(cls, filters, update_data):
        update_data["updated_at"] = localtime()

        conn = await cls.get_connection()
        return conn.update_many(filters, {"$set": update_data})

    @classmethod
    async def find(cls, filters):
        conn = await cls.get_connection()
        return conn.find(filters)

    @classmethod
    async def find_one(cls, filters) -> dict:
        conn = await cls.get_connection()
        return conn.find_one(filters)

    @classmethod
    async def delete_one(cls, filters):
        conn = await cls.get_connection()
        return conn.delete_one(filters)

    @classmethod
    async def delete_many(cls, filters):
        conn = await cls.get_connection()
        return conn.delete_many(filters)
