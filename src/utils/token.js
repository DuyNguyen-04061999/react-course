const TOKEN_KEY = "token";
const USER_KEY = "user";
export const setToken = (data) => {
  localStorage && localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
};
export const getToken = () => {
  return localStorage && JSON.parse(localStorage.getItem(TOKEN_KEY));
};
export const clearToken = () => {
  localStorage && localStorage.removeItem(TOKEN_KEY);
};

export const setUser = (data) => {
  localStorage && localStorage.setItem(USER_KEY, JSON.stringify(data));
};
export const getUser = () => {
  return (localStorage && JSON.parse(localStorage.getItem(USER_KEY))) || null;
};
export const clearUser = () => {
  localStorage && localStorage.removeItem(USER_KEY);
};
