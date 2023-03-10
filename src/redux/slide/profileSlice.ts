import {  createSlice } from "@reduxjs/toolkit";
import { loginApi, LoginData } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { changeRoute } from "./routeSlice";
import { getUserByIdpApi } from "../../api/userApi";
interface UserState {
  userId: string;
  name: string;
}

const initialState = {
  userId: "",
  name: "",
  email: "",
  userType: ""
};



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserReducer(state, action) {
      state.userId = action.payload.userId._id;
      state.email = action.payload.userId.email; 
      state.name = action.payload.username;
      state.userType = action.payload.userType;
    },
  },
});

const { setUserReducer } = userSlice.actions;
 

export const setUser = (userId: string) => async (dispatch: Function) => {
  try {
    const response = await getUserByIdpApi(userId);
    console.log("data pprom setuser",response.data.data);
    dispatch(setUserReducer(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

export default userSlice;