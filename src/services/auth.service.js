import { api, AUTHENTICATION_API } from "@/config/api";

export const authService = {
  login: (data) => api.post(`${AUTHENTICATION_API}/login`, data),

  refreshToken: (data) =>
    api.post(`${AUTHENTICATION_API}/refresh-token`, data),
};
