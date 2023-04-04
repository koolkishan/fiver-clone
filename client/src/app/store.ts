import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // reference reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
