"use client";

import { Fragment, ReactNode, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { useAxios } from "@/hooks/useAxios";
import { authenticate } from "@/store/features/authSlice";
import { Response, User } from "@/types";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, data } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { fetch } = useAxios();

  console.log(isAuthenticated , data);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    } else {
      const getMeUser = async () => {
        const { error, data } = await fetch<Response<User>>("/user/me");
        if (error) {
          router.replace("/login");
        } else if (data) {
          dispatch(authenticate(data.data));
        }
      };
      getMeUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Fragment>{children}</Fragment>;
}
