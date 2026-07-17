from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, HTTPException

from app.routes.user import router as user_router
from app.routes.upload import router as upload_router
from app.middleware import log_requests
from fastapi.exceptions import RequestValidationError
from app.exception_handler import validation_exception_handler
from app.exception_handler import (
    validation_exception_handler,
    http_exception_handler
)


app = FastAPI(
    title="Backend Engineer Learning Project",
    version="1.0.0"
)
app.mount(
    "/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads"
)

# Register Middleware
app.middleware("http")(log_requests)
app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler
)

app.add_exception_handler(
    HTTPException,
    http_exception_handler
)

# Register Routes
app.include_router(user_router)
app.include_router(upload_router)


@app.get("/")
async def home():

    return {
        "message": "Backend API is Running Successfully 🚀"
    }