# Auth service
from datetime import datetime, timezone

from fastapi import HTTPException

from app.database import users_collection

from app.blacklist import blacklist_token

from app.schemas.login_schema import LoginRequest
from app.schemas.change_password_schema import ChangePasswordRequest
from app.schemas.forgot_password_schema import ForgotPasswordRequest
from app.schemas.reset_password_schema import ResetPasswordRequest

from app.utils.hash_password import (
    verify_password,
    hash_password
)

from app.utils.jwt_token import (
    create_access_token,
    create_refresh_token,
    create_reset_token,
    verify_refresh_token,
    verify_reset_token
)
from app.services.email_service import send_email
# ---------------------------------------
# Login User
# ---------------------------------------
async def login_user(user: LoginRequest):

    # Find user by email
    db_user = await users_collection.find_one(
        {
            "email": user.email
        }
    )

    if not db_user:
        return {
            "success": False,
            "message": "Invalid email or password"
        }

    # Verify password
    if not verify_password(
        user.password,
        db_user["password"]
    ):
        return {
            "success": False,
            "message": "Invalid email or password"
        }

    # Create Access Token
    access_token = create_access_token(
        {
            "sub": db_user["email"],
            "role": db_user["role"]
        }
    )

    # Create Refresh Token
    refresh_token = create_refresh_token(
        {
            "sub": db_user["email"],
            "role": db_user["role"]
        }
    )

    return {
        "success": True,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }


# ---------------------------------------
# Get Logged-in User Profile
# ---------------------------------------
async def get_user_profile(email: str):

    db_user = await users_collection.find_one(
        {
            "email": email
        }
    )

    if db_user is None:
        return None

    return {
        "id": str(db_user["_id"]),
        "name": db_user["name"],
        "email": db_user["email"]
    }

# ---------------------------------------
# Change Password
# ---------------------------------------
async def change_password(
    email: str,
    password_data: ChangePasswordRequest
):

    # Find user
    db_user = await users_collection.find_one(
        {
            "email": email
        }
    )

    if db_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Verify current password
    if not verify_password(
        password_data.current_password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect"
        )

    # Prevent same password
    if password_data.current_password == password_data.new_password:
        raise HTTPException(
            status_code=400,
            detail="New password must be different from current password"
        )

    # Hash new password
    new_hashed_password = hash_password(
        password_data.new_password
    )

    # Update database
    await users_collection.update_one(
        {
            "email": email
        },
        {
            "$set": {
                "password": new_hashed_password
            }
        }
    )

    return {
        "success": True,
        "message": "Password changed successfully"
    }

# ---------------------------------------
# Forgot Password
# ---------------------------------------
async def forgot_password(
    request: ForgotPasswordRequest
):

    # Find user
    db_user = await users_collection.find_one(
        {
            "email": request.email
        }
    )

    if db_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Generate reset token
    reset_token = create_reset_token(
        request.email
    )

    # Save token in database
    await users_collection.update_one(
        {
            "email": request.email
        },
        {
            "$set": {
                "reset_token": reset_token,
                "reset_token_created_at": datetime.now(timezone.utc)
            }
        }
    )
    
    # Email Subject
    subject = "Password Reset Request"

    # Email Body
    body = f"""
    Hello {db_user['name']},

    A password reset request was received for your account.

    Use the following reset token to reset your password:

    {reset_token}

    If you did not request this password reset, you can ignore this email.

    Regards,
    FastAPI Authentication and User Management API
    """

    # Send Email
    send_email(
        recipient=request.email,
        subject=subject,
        body=body
    )

    return {
        "success": True,
        "message": "Password reset email sent successfully."
    }

# ---------------------------------------
# Reset Password
# ---------------------------------------
async def reset_password(
    request: ResetPasswordRequest
):

    payload = verify_reset_token(
        request.token
    )

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired reset token"
        )

    email = payload["sub"]

    db_user = await users_collection.find_one(
        {
            "email": email
        }
    )

    if db_user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    new_password = hash_password(
        request.new_password
    )

    await users_collection.update_one(
        {
            "email": email
        },
        {
            "$set": {
                "password": new_password
            },
            "$unset": {
                "reset_token": "",
                "reset_token_created_at": ""
            }
        }
    )

    return {
        "success": True,
        "message": "Password reset successfully"
    }

# ---------------------------------------
# Refresh Access Token
# ---------------------------------------
async def refresh_access_token(refresh_token: str):

    payload = verify_refresh_token(refresh_token)

    if payload is None:
        return {
            "success": False,
            "message": "Invalid or Expired Refresh Token"
        }

    new_access_token = create_access_token(
        {
            "sub": payload["sub"],
            "role": payload["role"]
        }
    )

    return {
        "success": True,
        "access_token": new_access_token,
        "token_type": "bearer"
    }

# ---------------------------------------
# Logout User
# ---------------------------------------
async def logout_user(token: str):

    # Add token to blacklist
    blacklist_token(token)

    return {
        "success": True,
        "message": "Logged out successfully"
    }

