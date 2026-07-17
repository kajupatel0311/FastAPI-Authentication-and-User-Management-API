# App configuration

import os
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()

# ---------------------------------------
# MongoDB
# ---------------------------------------
MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb://host.docker.internal:27017"
)

DATABASE_NAME = os.getenv(
    "DATABASE_NAME",
    "fastapi_db"
)

# ---------------------------------------
# JWT
# ---------------------------------------
SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "my_super_secret_key"
)

ALGORITHM = os.getenv(
    "ALGORITHM",
    "HS256"
)

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30)
)

REFRESH_TOKEN_EXPIRE_DAYS = int(
    os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", 7)
)

RESET_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("RESET_TOKEN_EXPIRE_MINUTES", 15)
)