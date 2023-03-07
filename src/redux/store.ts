import { configureStore } from "@reduxjs/toolkit";
import userReduce from "./slide/profileSlice";

const store = configureStore({
  reducer: {
    user: userReduce.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
