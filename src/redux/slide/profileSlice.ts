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
  email: ""
};



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserReducer(state, action) {
      state.userId = action.payload.userId;
      state.email = action.payload.email; 
    },
  },
});

const { setUserReducer } = userSlice.actions;
 

export const setUser = (userId: string) => async (dispatch: Function) => {
  try {
    const response = await getUserByIdpApi(userId);
    console.log(response.data.data);
    dispatch(setUserReducer(response.data.data));
  } catch (error) {
    console.log(error);
  }
};

export default userSlice;