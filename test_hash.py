from app.utils.hash_password import hash_password, verify_password

password = "Kaju@123"

hashed_password = hash_password(password)

print("Original Password :", password)
print("Hashed Password   :", hashed_password)

result = verify_password(password, hashed_password)

print("Password Match :", result)