# JWT Token Blacklist

# Stores blacklisted access tokens
# (For learning purposes this is in memory.
# Later we will move it to Redis.)

blacklisted_tokens = set()


# ---------------------------------------
# Add Token to Blacklist
# ---------------------------------------
def blacklist_token(token: str):

    blacklisted_tokens.add(token)


# ---------------------------------------
# Check Whether Token is Blacklisted
# ---------------------------------------
def is_token_blacklisted(token: str):

    return token in blacklisted_tokens