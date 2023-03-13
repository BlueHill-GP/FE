import { createSlice } from "@reduxjs/toolkit";
import {
  loginApi,
  LoginData,
  resendOtpApi,
  ResendOtpData,
  verifyOtpApi,
  VerifyOtpData,
} from "../../api/authApi";
import { changeRoute } from "./routeSlice";
import { setUser } from "./profileSlice";
import { clearAllStorage } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
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
      dispatch(setUser(response.data.data.userId));
      dispatch(setLogin());
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch: Function) => {
  clearAllStorage();
  dispatch(setLogOut());
}

export const verifyOtpRegister =
  (data: VerifyOtpData, navigate: Function) => async (dispatch: Function) => {
    try {
      const response = await verifyOtpApi(data);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const resendOtp =
  (email: ResendOtpData) => async (dispatch: Function) => {
    try {
      const response = await resendOtpApi(email);
      if (response.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };

export const setLoginState = () => async (dispatch: Function) => { 
  dispatch(setLogin());
}

export default authSlice;
