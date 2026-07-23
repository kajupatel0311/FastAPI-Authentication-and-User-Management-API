from bson import ObjectId
from bson.errors import InvalidId

from app.database import users_collection
from app.schemas.user_schema import UserCreate
from app.schemas.update_user_schema import UpdateUser
from app.utils.hash_password import hash_password
from fastapi import HTTPException


# ---------------------------------------
# Register User
# ---------------------------------------
async def register_user(user: UserCreate):

    existing_user = await users_collection.find_one(
        {
            "email": user.email
        }
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email already registered"
        )
    new_user = {
    "name": user.name,
    "email": user.email,
    "password": hash_password(user.password),
    "role": "user",
    "profile_image": None
    }

    result = await users_collection.insert_one(new_user)

    return {
        "success": True,
        "message": "User Registered Successfully",
        "user_id": str(result.inserted_id)
    }


# ---------------------------------------
# Get All Users
# Pagination + Search + Sorting + Filtering
# ---------------------------------------
async def get_all_users(
    page: int,
    limit: int,
    search: str,
    sort: str,
    domain: str
):

    skip = (page - 1) * limit

    query = {}

    # ----------------------------
    # Search
    # ----------------------------
    if search:

        query["$or"] = [
            {
                "name": {
                    "$regex": search,
                    "$options": "i"
                }
            },
            {
                "email": {
                    "$regex": search,
                    "$options": "i"
                }
            }
        ]

    # ----------------------------
    # Email Domain Filter
    # ----------------------------
    if domain:

        query["email"] = {
            "$regex": f"@{domain}$",
            "$options": "i"
        }

    # ----------------------------
    # Sorting
    # ----------------------------
    sort_order = 1
    sort_field = sort

    if sort.startswith("-"):
        sort_order = -1
        sort_field = sort[1:]

    allowed_fields = [
        "name",
        "email"
    ]

    if sort_field not in allowed_fields:
        sort_field = "name"

    total_users = await users_collection.count_documents(query)

    users = []

    cursor = (
        users_collection
        .find(query)
        .sort(sort_field, sort_order)
        .skip(skip)
        .limit(limit)
    )

    async for user in cursor:

        users.append(
            {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"],
                "role": user.get("role", "user"),
                "profile_image": user.get("profile_image")
            }
        )

    return {
        "page": page,
        "limit": limit,
        "total": total_users,
        "search": search,
        "sort": sort,
        "domain": domain,
        "users": users
    }
# ---------------------------------------
# Get User By ID
# ---------------------------------------
async def get_user_by_id(user_id: str):

    try:
        object_id = ObjectId(user_id)

    except InvalidId:

        raise HTTPException(
            status_code=400,
            detail="Invalid User ID"
        )

    user = await users_collection.find_one(
        {
            "_id": object_id
        }
    )

    if user is None:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user.get("role", "user"),
        "profile_image": user.get("profile_image")
    }


# ---------------------------------------
# Update User
# ---------------------------------------
async def update_user(user_id: str, user: UpdateUser):

    try:
        object_id = ObjectId(user_id)
    except InvalidId:
        return {
            "success": False,
            "message": "Invalid User ID"
        }

    existing_user = await users_collection.find_one(
        {
            "_id": object_id
        }
    )

    if existing_user is None:
        return {
            "success": False,
            "message": "User not found"
        }

    update_data = {}

    if user.name is not None:
        update_data["name"] = user.name
        
    # ----------------------------
    # Update Role
    # ---------------------------- 
    if user.role is not None:
        if user.role not in ["admin", "user"]:
            raise HTTPException(
                status_code=400,
                detail="Invalid role."
            )
        update_data["role"] = user.role

    if not update_data:
        return {
            "success": False,
            "message": "No fields provided to update"
        }

    await users_collection.update_one(
        {
            "_id": object_id
        },
        {
            "$set": update_data
        }
    )

    updated_user = await users_collection.find_one(
        {
            "_id": object_id
        }
    )

    return {
    "success": True,
    "message": "User Updated Successfully",
    "user": {
        "id": str(updated_user["_id"]),
        "name": updated_user["name"],
        "email": updated_user["email"],
        "role": updated_user.get("role", "user"),
        "profile_image": updated_user.get("profile_image")
    }
}


# ---------------------------------------
# Delete User
# ---------------------------------------
async def delete_user(user_id: str):

    try:
        object_id = ObjectId(user_id)
    except InvalidId:
        return {
            "success": False,
            "message": "Invalid User ID"
        }

    existing_user = await users_collection.find_one(
        {
            "_id": object_id
        }
    )

    if existing_user is None:
        return {
            "success": False,
            "message": "User not found"
        }

    await users_collection.delete_one(
        {
            "_id": object_id
        }
    )

    return {
        "success": True,
        "message": "User Deleted Successfully"
    }

# ---------------------------------------
# Update Logged-in User Profile
# ---------------------------------------
async def update_my_profile(
    email: str,
    profile
):

    # Find current user
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

    update_data = {}

    # ----------------------------
    # Update Name
    # ----------------------------
    if profile.name is not None:
        update_data["name"] = profile.name

    # ----------------------------
    # Update Email
    # ----------------------------
    if (
        profile.email is not None
        and profile.email != email
    ):

        existing_user = await users_collection.find_one(
            {
                "email": profile.email
            }
        )

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already exists."
            )

        update_data["email"] = profile.email

    # ----------------------------
    # Update Database
    # ----------------------------
    if update_data:

        await users_collection.update_one(
            {
                "email": email
            },
            {
                "$set": update_data
            }
        )

    # ----------------------------
    # Return Updated User
    # ----------------------------
    updated_user = await users_collection.find_one(
        {
            "email": update_data.get("email", email)
        }
    )

    return {
        "success": True,
        "message": "Profile updated successfully",
        "data": {
            "id": str(updated_user["_id"]),
            "name": updated_user["name"],
            "email": updated_user["email"],
            "role": updated_user["role"],
            "profile_image": updated_user.get("profile_image")
        }
    }

