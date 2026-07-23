from fastapi import APIRouter, Depends

from app.auth import get_current_user

from app.services.dashboard_service import (
    get_dashboard_stats,
    get_dashboard_activity,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


# ---------------------------------------
# Dashboard Statistics
# ---------------------------------------
@router.get("/stats")
async def dashboard_stats(
    current_user=Depends(get_current_user)
):

    return await get_dashboard_stats(
        current_user
    )


# ---------------------------------------
# Dashboard Activity
# ---------------------------------------
@router.get("/activity")
async def dashboard_activity(
    current_user=Depends(get_current_user)
):

    return await get_dashboard_activity()

