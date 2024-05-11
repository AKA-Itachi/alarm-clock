import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()


def connect():
    mongo_url = os.environ.get("MONGO_URL")
    print("Connecting to %s" % mongo_url)
    mongo_db = os.environ.get("DB_NAME")
    client = MongoClient(mongo_url)
    db = client[mongo_db]
    return db


async def get_connection(collection: str):
    db = connect()
    conn = db[collection]
    return conn


async def get_db_collection(db, collection):
    conn = db[collection]
    return conn
