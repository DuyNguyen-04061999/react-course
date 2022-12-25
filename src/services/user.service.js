import { api, USER_API } from "@/config/api";

export const userService = {
  signup: (data) => api.post(`${USER_API}/register`, data),

  getProfile: () => api.get(`${USER_API}`),

  resendEmail: (data) => api.post(`${USER_API}/resend-email`, data),

  updateInfo: (data) => api.patch(`${USER_API}`, data),

  sendEmailResetPassword: (data) =>
    api.post(`${USER_API}/reset-password`, data),

  resetPasswordByCode: (data) =>
    api.post(`${USER_API}/change-password-by-code`, data),
};
