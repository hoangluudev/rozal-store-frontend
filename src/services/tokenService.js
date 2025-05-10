const TOKEN_KEY = "accessToken";
const TOKEN_EXP = "sessionid_exp";
const LOCALSTORAGE = localStorage;

export const getAccessToken = () => {
  const accessToken = LOCALSTORAGE.getItem(TOKEN_KEY) || null;
  return accessToken;
};

export const setAccessToken = (token) => {
  LOCALSTORAGE.setItem(TOKEN_KEY, token);
};

export const removeAccessToken = () => {
  LOCALSTORAGE.removeItem(TOKEN_KEY);
};

export const getAccessToken_ExpTime = () => {
  return LOCALSTORAGE.getItem(TOKEN_EXP);
};

export const setAccessToken_ExpTime = (exp) => {
  LOCALSTORAGE.setItem(TOKEN_EXP, exp);
};

export const removeAccessToken_ExpTime = () => {
  LOCALSTORAGE.removeItem(TOKEN_EXP);
};

export const isAccessTokenExpired = () => {
  const accessToken = getAccessToken();
  if (accessToken) {
    const currentTime = Date.now();
    return currentTime >= getAccessToken_ExpTime();
  }
};
