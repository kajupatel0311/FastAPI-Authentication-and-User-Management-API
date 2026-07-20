from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, HTTPException
from app.database import check_database_connection
from app.routes.user import router as user_router
from app.routes.upload import router as upload_router
from app.middleware import log_requests
from fastapi.exceptions import RequestValidationError
from app.exceptions import register_exception_handlers
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
register_exception_handlers(app)
app.mount(
    "/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads"
)

# Register Middleware
app.middleware("http")(log_requests)


# Register Routes
app.include_router(
    user_router,
    prefix="/api/v1"
)

app.include_router(
    upload_router,
    prefix="/api/v1"
)

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