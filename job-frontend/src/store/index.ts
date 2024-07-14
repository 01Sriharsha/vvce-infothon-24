import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { authReducer } from "@/store/features/authSlice";
import { transcriptReducer } from "./features/transcriptionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    transcript : transcriptReducer
  },
});

type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
