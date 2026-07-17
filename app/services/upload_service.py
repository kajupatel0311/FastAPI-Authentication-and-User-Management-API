import os
import uuid
from app.database import users_collection
from fastapi import UploadFile, HTTPException


# ---------------------------------------
# Allowed Extensions
# ---------------------------------------
ALLOWED_EXTENSIONS = {
    "jpg",
    "jpeg",
    "png",
    "webp"
}

# ---------------------------------------
# Maximum File Size (5 MB)
# ---------------------------------------
MAX_FILE_SIZE = 5 * 1024 * 1024


# ---------------------------------------
# Upload Image
# ---------------------------------------
async def upload_image(file: UploadFile):

    # ----------------------------
    # Validate Extension
    # ----------------------------
    extension = file.filename.split(".")[-1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG, PNG and WEBP images are allowed."
        )

    # ----------------------------
    # Read File
    # ----------------------------
    file_bytes = await file.read()

    # ----------------------------
    # Validate File Size
    # ----------------------------
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size should not exceed 5 MB."
        )

    # ----------------------------
    # Upload Folder
    # ----------------------------
    upload_folder = "app/uploads/profile_images"

    # ----------------------------
    # Create Unique Filename
    # ----------------------------
    unique_filename = f"{uuid.uuid4().hex}_{file.filename}"

    # ----------------------------
    # Full Path
    # ----------------------------
    file_path = os.path.join(
        upload_folder,
        unique_filename
    )

    # ----------------------------
    # Save File
    # ----------------------------
    with open(file_path, "wb") as buffer:
        buffer.write(file_bytes)

    # ----------------------------
    # Response
    # ----------------------------
    return {
        "success": True,
        "message": "Image uploaded successfully",
        "filename": unique_filename,
        "url": f"/uploads/profile_images/{unique_filename}"
    }

# ---------------------------------------
# Upload User Profile Image
# ---------------------------------------
async def upload_profile_image(
    file: UploadFile,
    current_user: dict
):

    # Get current user
    db_user = await users_collection.find_one(
        {
            "email": current_user["email"]
        }
    )

    # Delete old profile image if it exists
    if db_user and db_user.get("profile_image"):

        old_image = db_user["profile_image"]

        old_image_path = old_image.replace(
            "/uploads/",
            "app/uploads/"
        )

        if os.path.exists(old_image_path):
            os.remove(old_image_path)

    # Upload new image
    result = await upload_image(file)

    # Update MongoDB
    await users_collection.update_one(
        {
            "email": current_user["email"]
        },
        {
            "$set": {
                "profile_image": result["url"]
            }
        }
    )

    return {
        "success": True,
        "message": "Profile image updated successfully",
        "profile_image": result["url"]
    }