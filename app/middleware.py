import time

from fastapi import Request
from starlette.responses import Response

from app.logger import logger


async def log_requests(request: Request, call_next):
    """
    Middleware to log every request and response time.
    """

    start_time = time.time()

    response: Response = await call_next(request)

    process_time = time.time() - start_time

    logger.info(
        f"{request.method} {request.url.path} | "
        f"Status: {response.status_code} | "
        f"Time: {process_time:.4f} sec"
    )

    response.headers["X-Process-Time"] = f"{process_time:.4f}"

    return response