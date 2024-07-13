"use client";

import store from "@/store";
import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "sonner";
import AuthProvider from "./auth-provider";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ReduxProvider store={store}>
        <AuthProvider>{children}</AuthProvider>
      </ReduxProvider>
      <Toaster
        toastOptions={{ closeButton: true }}
        richColors
        position="bottom-right"
      />
    </>
  );
};

export default AppProvider;
