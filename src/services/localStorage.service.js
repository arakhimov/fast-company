const TOKEN_KEY = "jwt-id-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expireIn";

export function setTokens({ expiresIn = 3600, idToken, refreshToken }) {
  const expiresInData = new Date().getTime() + expiresIn * 1000;

  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresInData);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getefreshToken,
  getTokenExpiresDate
};

export default localStorageService;
