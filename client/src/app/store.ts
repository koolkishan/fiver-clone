import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./auth/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
