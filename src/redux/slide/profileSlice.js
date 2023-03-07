import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, LoginData } from "../../api/authApi";

// interface UserState {
//   userId: string;
//   name: string;
// }

const initialState = {
  userId: "",
  name: "",
};



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
          state.userId = action.payload.userId;
      state.name = action.payload.name;
      console.log("oki1");
      
    });
  }
})

export const login = createAsyncThunk("user/login", async (user) => {
  console.log("of3");

  const response = await loginApi(user);
  console.log(response);

  return response.data;
});



export default userSlice;