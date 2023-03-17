import { createSlice } from "@reduxjs/toolkit";
import {
  loginApi,
  LoginData,
  resendOtpApi,
  ResendOtpData,
  verifyOtpApi,
  VerifyOtpData,
} from "../../api/authApi";
import { setUser } from "./profileSlice";
import { clearAllStorage } from "../../utils/storage";
import { messageError, messageSuccess } from "../../utils/notifi";
import { socket } from "../../App";
const initialState = {
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state) => {
      state.isLogin = true;
    },
    setLogOut: (state) => {
      state.isLogin = false;
    },
  },
});
const { setLogin, setLogOut } = authSlice.actions;
export const login = (user: LoginData) => async (dispatch: Function) => {
  try {
    const response = await loginApi(user);
    if (response.status === 200) {
      socket.connect();
      dispatch(setUser(response.data.data.userId));
      messageSuccess("Login successful, welcome");
      dispatch(setLogin());

      socket.emit("user-connect", response.data.data.userId);
    } else {
    }
  } catch (error: any) {
    console.log(error);
    messageError(error);
  }
};

export const logout = () => async (dispatch: Function) => {
  clearAllStorage();
  dispatch(setLogOut());
  window.location.reload();
};

export const verifyOtpRegister =
  (data: VerifyOtpData, navigate: Function) => async (dispatch: Function) => {
    try {
      const response = await verifyOtpApi(data);
      if (response.status === 200) {
        navigate("/");
        messageSuccess("Verify OTP successful");
      }
    } catch (error) {
      console.log(error);
      messageError(error);
    }
  };

export const resendOtp =
  (email: ResendOtpData) => async (dispatch: Function) => {
    try {
      const response = await resendOtpApi(email);
      if (response.status === 200) {
        messageSuccess(response.data.message);
      }
    } catch (error) {
      console.log(error);
      messageError(error);
    }
  };

export const setLoginState = () => async (dispatch: Function) => {
  dispatch(setLogin());
};

export default authSlice;
