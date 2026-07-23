import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb+srv://kajupatel2003_db_user:aks%40P758192@cluster0.cfabonl.mongodb.net/backend_db?retryWrites=true&w=majority&appName=Cluster0"

async def main():
    try:
        client = AsyncIOMotorClient(MONGO_URI)

        await client.admin.command("ping")

        print("✅ MongoDB Connected Successfully!")

    except Exception as e:
        print("❌ Connection Failed")
        print(type(e).__name__)
        print(e)

asyncio.run(main())