from fastapi import APIRouter, UploadFile, File, Depends

from app.auth import get_current_user

from app.services.upload_service import (
    upload_image,
    upload_profile_image
)

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.get("/")
async def upload_home():

    return {
        "message": "Upload Module Working Successfully"
    }


@router.post("/image")
async def upload_image_api(
    file: UploadFile = File(...)
):

    return await upload_image(file)


@router.post("/profile-image")
async def upload_user_profile_image(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):

    return await upload_profile_image(
        file,
        current_user
    )