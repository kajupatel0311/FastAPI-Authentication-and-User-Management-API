# Authentication module

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.utils.jwt_token import verify_access_token
from app.blacklist import is_token_blacklisted

security = HTTPBearer()


# ---------------------------------------
# Get Current Logged-in User
# ---------------------------------------
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    # Check whether token is blacklisted
    if is_token_blacklisted(token):
        raise HTTPException(
            status_code=401,
            detail="Token has been logged out"
        )

    # Verify JWT Token
    payload = verify_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or Expired Token"
        )

    email = payload.get("sub")
    role = payload.get("role")

    if email is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

    return {
        "email": email,
        "role": role
    }


# ---------------------------------------
# Admin Authorization
# ---------------------------------------
async def require_admin(
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Access Denied. Admin Only."
        )

    return current_user