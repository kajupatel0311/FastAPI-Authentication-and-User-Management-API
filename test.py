from app.blacklist import *

blacklist_token("abc123")

print(is_token_blacklisted("abc123"))