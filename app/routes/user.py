from app.schemas.update_profile_schema import UpdateProfile
from fastapi import APIRouter, Depends, Query
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from app.auth import (
    get_current_user,
    require_admin
)

from app.schemas.user_schema import UserCreate
from app.schemas.login_schema import LoginRequest
from app.schemas.refresh_schema import RefreshTokenRequest
from app.schemas.update_user_schema import UpdateUser
from app.schemas.change_password_schema import ChangePasswordRequest
from app.schemas.forgot_password_schema import ForgotPasswordRequest
from app.schemas.reset_password_schema import ResetPasswordRequest
from app.services.user_service import (
    register_user,
    get_all_users,
    get_user_by_id,
    update_user,
    delete_user,
    update_my_profile
)

from app.services.auth_service import (
    login_user,
    get_user_profile,
    refresh_access_token,
    logout_user,
    change_password,
    forgot_password,
    reset_password
)

from app.logger import logger
security = HTTPBearer()
router = APIRouter(
    prefix="/users",
    tags=["Users"]
)



# ---------------------------------------
# Register User
# ---------------------------------------
@router.post("/register")
async def register(user: UserCreate):

    logger.info(f"Register API Called : {user.email}")

    return await register_user(user)


# ---------------------------------------
# Login User
# ---------------------------------------
@router.post("/login")
async def login(user: LoginRequest):

    logger.info(f"Login API Called : {user.email}")

    return await login_user(user)

# ---------------------------------------
# Refresh Access Token
# ---------------------------------------
@router.post("/refresh")
async def refresh_token(
    request: RefreshTokenRequest
):

    return await refresh_access_token(
        request.refresh_token
    )

# ---------------------------------------
# Logout User
# ---------------------------------------
@router.post("/logout")
async def logout(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    return await logout_user(token)

# ---------------------------------------
# Logged-in User Profile
# ---------------------------------------
@router.get("/profile")
async def profile(
    current_user=Depends(get_current_user)
):

    return await get_user_profile(
        current_user["email"]
    )


# ---------------------------------------
# Get My Profile
# ---------------------------------------
@router.get("/me")
async def get_my_profile(
    current_user=Depends(get_current_user)
):

    return await get_user_profile(
        current_user["email"]
    )


# ---------------------------------------
# Change Password
# ---------------------------------------
@router.put("/change-password")
async def update_password(
    password_data: ChangePasswordRequest,
    current_user=Depends(get_current_user)
):

    return await change_password(
        current_user["email"],
        password_data
    )


# ---------------------------------------
# Forgot Password
# ---------------------------------------
@router.post("/forgot-password")
async def forgot_password_api(
    request: ForgotPasswordRequest
):

    return await forgot_password(request)


# ---------------------------------------
# Reset Password
# ---------------------------------------
@router.post("/reset-password")
async def reset_password_api(
    request: ResetPasswordRequest
):

    return await reset_password(request)
# ---------------------------------------
# Get All Users
# ---------------------------------------
@router.get("/")
async def read_users(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: str = Query(""),
    sort: str = Query("name"),
    domain: str = Query(""),
    current_user=Depends(require_admin)
):

    return await get_all_users(
        page,
        limit,
        search,
        sort,
        domain
    )

# ---------------------------------------
# Update My Profile
# ---------------------------------------
@router.put("/me")
async def edit_my_profile(
    profile: UpdateProfile,
    current_user=Depends(get_current_user)
):

    return await update_my_profile(
        current_user["email"],
        profile
    )
# ---------------------------------------
# Get User By ID
# ---------------------------------------
@router.get("/{user_id}")
async def read_user(user_id: str):

    return await get_user_by_id(user_id)


# ---------------------------------------
# Update User
# ---------------------------------------
@router.put("/{user_id}")
async def edit_user(
    user_id: str,
    user: UpdateUser,
    current_user=Depends(require_admin)
):

    return await update_user(
        user_id,
        user
    )


# ---------------------------------------
# Delete User
# ---------------------------------------
@router.delete("/{user_id}")
async def remove_user(
    user_id: str,
    current_user=Depends(require_admin)
):

    return await delete_user(user_id)

