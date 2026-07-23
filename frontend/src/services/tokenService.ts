const ACCESS_TOKEN_KEY = "access_token";

const REFRESH_TOKEN_KEY = "refresh_token";


// ---------------------------------------
// Save Tokens
// ---------------------------------------
export function saveTokens(
  accessToken: string,
  refreshToken: string
): void {

  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    accessToken
  );

  localStorage.setItem(
    REFRESH_TOKEN_KEY,
    refreshToken
  );

}


// ---------------------------------------
// Get Access Token
// ---------------------------------------
export function getAccessToken(): string | null {

  return localStorage.getItem(
    ACCESS_TOKEN_KEY
  );

}


// ---------------------------------------
// Get Refresh Token
// ---------------------------------------
export function getRefreshToken(): string | null {

  return localStorage.getItem(
    REFRESH_TOKEN_KEY
  );

}


// ---------------------------------------
// Update Access Token
// ---------------------------------------
export function updateAccessToken(
  accessToken: string
): void {

  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    accessToken
  );

}


// ---------------------------------------
// Remove Tokens
// ---------------------------------------
export function removeTokens(): void {

  localStorage.removeItem(
    ACCESS_TOKEN_KEY
  );

  localStorage.removeItem(
    REFRESH_TOKEN_KEY
  );

}


// ---------------------------------------
// Check Authentication
// ---------------------------------------
export function isAuthenticated(): boolean {

  return !!getAccessToken();

}

