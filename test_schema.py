from app.schemas.user_schema import UserCreate

user = UserCreate(
    name="Kaju",
    email="kaju@gmail.com",
    password="Password123"
)

print(user)
