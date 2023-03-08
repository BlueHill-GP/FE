import { createSlice } from "@reduxjs/toolkit";

type RouteType = "home" | "about" | "login" | "register" | "new" | "profile";

const initialState = {
  route: "",
  theme: false,
};

const route = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRoute(state, action) {
      state.route = action.payload;
    },

    setTheme(state) {
      state.theme = !state.theme;
    },
  },
});

const { setTheme, setRoute } = route.actions;

export const changeRoute = (payload: string) => (dispatch: Function) => {
  dispatch(setRoute(payload));
};

export const changeTheme = () => (dispatch: Function) => {
  dispatch(setTheme());
};
export default route;
