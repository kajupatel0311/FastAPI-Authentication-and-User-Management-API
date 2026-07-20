# Database configuration

from motor.motor_asyncio import AsyncIOMotorClient

from app.config import (
    MONGO_URI,
    DATABASE_NAME
)


# ---------------------------------------
# Create MongoDB Client
# ---------------------------------------
client = AsyncIOMotorClient(
    MONGO_URI
)


# ---------------------------------------
# Select Database
# ---------------------------------------
db = client[DATABASE_NAME]


# ---------------------------------------
# Collections
# ---------------------------------------
users_collection = db["users"]


# ---------------------------------------
# Database Health Check
# ---------------------------------------
async def check_database_connection():

    try:

        await db.command("ping")

        return True

    except Exception:

        return False
    
    