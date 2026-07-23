from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.database import check_database_connection
from app.middleware import log_requests
from app.exceptions import register_exception_handlers

from app.routes.user import router as user_router
from app.routes.upload import router as upload_router
from app.routes.dashboard import router as dashboard_router


app = FastAPI(
    title="FastAPI Authentication and User Management API",
    description="""
    RESTful backend API with JWT Authentication, User Management,
    Role-Based Access Control, File Uploads, Password Recovery,
    MongoDB Integration and Docker Support.
    """,
    version="1.0.0",
    contact={
        "name": "Kaju Patel",
        "email": "kajupatel2003@gmail.com"
    },
    license_info={
        "name": "MIT License"
    }
)

# ---------------------------------------
# CORS
# ---------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://fast-api-authentication-and-user-ma-ten.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------
# Global Exception Handlers
# ---------------------------------------

register_exception_handlers(app)

# ---------------------------------------
# Upload Directory
# ---------------------------------------

UPLOAD_DIR = Path("app/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app.mount(
    "/uploads",
    StaticFiles(directory=str(UPLOAD_DIR)),
    name="uploads"
)

# ---------------------------------------
# Middleware
# ---------------------------------------

app.middleware("http")(log_requests)

# ---------------------------------------
# Routes
# ---------------------------------------

app.include_router(
    user_router,
    prefix="/api/v1"
)

app.include_router(
    upload_router,
    prefix="/api/v1"
)

app.include_router(
    dashboard_router,
    prefix="/api/v1"
)

# ---------------------------------------
# Home
# ---------------------------------------

@app.get("/")
async def home():

    return {
        "success": True,
        "message": "Backend API is running successfully."
    }

# ---------------------------------------
# Health Check
# ---------------------------------------

@app.get("/health")
async def health_check():

    db_status = await check_database_connection()

    return {
        "status": "healthy" if db_status else "unhealthy",
        "application": "running",
        "database": "connected" if db_status else "disconnected"
    }

