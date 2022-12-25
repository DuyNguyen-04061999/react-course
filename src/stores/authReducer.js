import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import handleError from "@/utils/handleError";
import {
  clearToken,
  clearUser,
  getUser,
  setToken,
  setUser,
} from "@/utils/token";
import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

export const SET_USER = "setUser";
export const LOG_OUT = "logOut";

//================ Slice ==============
const initialState = {
  user: getUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onSetUser: (state, { payload }) => ({ ...state, user: payload }),
    onLogOut: (state) => {
      clearUser();
      clearToken();
      message.success("Đăng xuất tài khoản thành công");
      return { ...state, user: null };
    },
  },
});

export const { onSetUser, onLogOut } = authSlice.actions;
export default authSlice.reducer;

// create action
export const loginAction = ({ data, final }) => {
  return async (dispatch) => {
    try {
      const res = await authService.login(data);

      if (res?.data) {
        setToken(res?.data);
        const user = await userService.getProfile();
        dispatch(onSetUser(user?.data));
        setUser(user?.data);
        message.success("Đăng nhập tài khoản thành công");
      }
    } catch (err) {
      handleError(err);
    } finally {
      final?.();
    }
  };
};

//
// export const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_USER:
//       return { ...state, user: action.payload };
//     case LOG_OUT:
//       return { ...state, user: null };

//     default:
//       return state;
//   }
// };
