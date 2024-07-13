import { User } from "@/types";
import { STORAGE_KEY } from "@/util/constant";
import { getlocalstorage } from "@/util/localstorage";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  data: User | null;
};

const initialState: AuthState = {
  isAuthenticated: !!getlocalstorage<boolean>(STORAGE_KEY),
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      if (!state.isAuthenticated) {
        state.isAuthenticated = true;
        state.data = action.payload;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.data = null;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
