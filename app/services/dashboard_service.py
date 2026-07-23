from app.database import users_collection


# ---------------------------------------
# Dashboard Statistics
# ---------------------------------------
async def get_dashboard_stats(current_user):

    total_users = await users_collection.count_documents({})

    total_admins = await users_collection.count_documents(
        {
            "role": "admin"
        }
    )

    total_regular_users = await users_collection.count_documents(
        {
            "role": "user"
        }
    )

    # ---------------------------------------
    # Recent Users
    # ---------------------------------------

    recent_users = []

    cursor = (
        users_collection
        .find({})
        .sort("_id", -1)
        .limit(5)
    )

    async for user in cursor:

        recent_users.append(
            {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"],
                "role": user.get("role", "user"),
                "profile_image": user.get("profile_image")
            }
        )

    return {

        "success": True,

        "data": {

            "total_users": total_users,

            "total_admins": total_admins,

            "total_regular_users": total_regular_users,

            "my_role": current_user["role"],

            "recent_users": recent_users

        }

    }


# ---------------------------------------
# Dashboard Activity
# ---------------------------------------
async def get_dashboard_activity():

    activities = []

    cursor = (
        users_collection
        .find({})
        .sort("_id", -1)
        .limit(5)
    )

    async for user in cursor:

        activities.append(
            {
                "title": "New User Registered",
                "description": f"{user['name']} joined the platform.",
                "user": user["name"],
                "role": user.get("role", "user"),
                "profile_image": user.get("profile_image")
            }
        )

    return {

        "success": True,

        "activities": activities

    }