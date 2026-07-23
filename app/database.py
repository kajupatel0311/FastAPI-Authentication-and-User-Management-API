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

audit_logs_collection = db["audit_logs"]


# ---------------------------------------
# Database Health Check
# ---------------------------------------
async def check_database_connection():

    try:

        await db.command("ping")

        print("✅ MongoDB Atlas Connected Successfully.")

        return True

    except Exception as e:

        print("\n==============================")
        print("MongoDB Connection Error")
        print("==============================")
        print(repr(e))
        print("==============================\n")

        return False