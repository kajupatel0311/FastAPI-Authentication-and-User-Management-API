from app.utils.jwt_token import (
    create_access_token,
    verify_access_token
)

token = create_access_token(
    {
        "sub": "kaju@gmail.com",
        "role": "user"
    }
)

print("Generated Token:\n")
print(token)

print()

payload = verify_access_token(token)

print("Decoded Payload:\n")
print(payload)
