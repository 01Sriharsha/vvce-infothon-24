import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  data: User | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      state.data = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.data = null;
    },
  },
});

export const {authenticate , logout} = authSlice.actions;

export const authReducer = authSlice.reducer;
