from fastapi import FastAPI
from routes import alarm_routes

app = FastAPI()

app.include_router(alarm_routes.router)
