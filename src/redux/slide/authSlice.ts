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
const initialState = {};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const login = (user: LoginData) => async (dispatch: Function) => {
  try {
    const response = await loginApi(user);
    if (response.status === 200) {
      dispatch(setUser(response.data.data.userId));
      dispatch(changeRoute("home"));
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch: Function) => {
  clearAllStorage();
  dispatch(changeRoute("login"));
};

export const verifyOtpRegister =
  (data: VerifyOtpData) => async (dispatch: Function) => {
    try {
      const response = await verifyOtpApi(data);
      if (response.status === 200) {
        dispatch(changeRoute("login"));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const resendOtp = (email: ResendOtpData) => async (dispatch: Function) => { 
  try {
    const response = await resendOtpApi(email);
    if (response.status === 200) {
      
    }
  } catch (error) {
    console.log(error);
    
  }
}

export default userSlice;
