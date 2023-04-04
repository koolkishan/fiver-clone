import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { InitialAuthState } from "./Auth.Type";

const initialState: InitialAuthState = {
  showLoginModal: false,
  showSignupModal: false,
};

export const AuthSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleLoginModal: (state, action: PayloadAction<boolean>) => {
      state.showLoginModal = action.payload;
    },
    toggleSignupModal: (state, action: PayloadAction<boolean>) => {
      state.showSignupModal = action.payload;
    },
    closeAuthModal: (state) => {
      state.showLoginModal = false;
      state.showSignupModal = false;
    },
  },
});

export const { toggleLoginModal, toggleSignupModal, closeAuthModal } =
  AuthSlice.actions;
