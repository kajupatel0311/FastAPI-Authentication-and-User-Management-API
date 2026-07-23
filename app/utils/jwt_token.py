# JWT token utilities

from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt

from app.config import (
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    REFRESH_TOKEN_EXPIRE_DAYS,
    RESET_TOKEN_EXPIRE_MINUTES
)


# ---------------------------------------
# Create Access Token
# ---------------------------------------
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update(
        {
            "exp": expire,
            "type": "access"
        }
    )

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# ---------------------------------------
# Create Refresh Token
# ---------------------------------------
def create_refresh_token(data: dict):

    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        days=REFRESH_TOKEN_EXPIRE_DAYS
    )

    to_encode.update(
        {
            "exp": expire,
            "type": "refresh"
        }
    )

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# ---------------------------------------
# Create Password Reset Token
# ---------------------------------------
def create_reset_token(email: str):

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=RESET_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": email,
        "type": "reset",
        "exp": expire
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# ---------------------------------------
# Verify Access Token
# ---------------------------------------
def verify_access_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        if payload.get("type") != "access":
            return None

        return payload

    except JWTError:

        return None


# ---------------------------------------
# Verify Refresh Token
# ---------------------------------------
def verify_refresh_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        if payload.get("type") != "refresh":
            return None

        return payload

    except JWTError:

        return None


# ---------------------------------------
# Verify Reset Token
# ---------------------------------------
def verify_reset_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        if payload.get("type") != "reset":
            return None

        return payload

    except JWTError:

        return None
    