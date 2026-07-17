# Database configuration
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGO_URI, DATABASE_NAME

# Create MongoDB client
client = AsyncIOMotorClient(MONGO_URI)

# Select database
db = client[DATABASE_NAME]

# Collections
users_collection = db["users"]