from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError

from app.exception_handler import (
    validation_exception_handler,
    http_exception_handler,
    global_exception_handler
)


# ---------------------------------------
# Register Exception Handlers
# ---------------------------------------
def register_exception_handlers(
    app: FastAPI
):

    app.add_exception_handler(
        RequestValidationError,
        validation_exception_handler
    )

    app.add_exception_handler(
        HTTPException,
        http_exception_handler
    )

    app.add_exception_handler(
        Exception,
        global_exception_handler
    )