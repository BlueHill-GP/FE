import { configureStore } from "@reduxjs/toolkit";
import userReduce from "./slide/profileSlice";
import routeReducer from "./slide/routeSlice";
const store = configureStore({
  reducer: {
    user: userReduce.reducer,
    route: routeReducer.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
