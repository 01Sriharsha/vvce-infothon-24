"use client";

import { FC, useEffect, useMemo } from "react";
import { BriefcaseBusiness, LogOut, UserPen } from "lucide-react";
import { ListCollapse } from "lucide-react";
import NavItem from "@/components/globals/nav-items";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const { data, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const routes = useMemo(() => {
    if (data?.role === "STUDENT") {
      return [
        {
          label: "Basic Details",
          href: "/u/student",
          icon: UserPen,
        },
        {
          label: "Role Details",
          href: "/u/student/roleDetails",
          icon: ListCollapse,
        },
      ];
    } else if (data?.role === "RECRUITER") {
      return [
        {
          label: "Basic Details",
          href: "/u/recruiter",
          icon: UserPen,
        },
        {
          label: "Role Details",
          href: "/u/recruiter/roleDetails",
          icon: ListCollapse,
        },
        {
          label: "Add Job",
          href: "/u/recruiter/createJob",
          icon: BriefcaseBusiness,
        },
      ];
    } else if (data?.role === "COORDINATOR") {
      return [
        {
          label: "Basic Details",
          href: "/u/placementOfficer",
          icon: UserPen,
        },
        {
          label: "Role Details",
          href: "/u/placementOfficer/roleDetails",
          icon: ListCollapse,
        },
      ];
    }
  }, [data]);

  return (
    <div className="flex overflow-y-auto">
      <div className="flex flex-col h-screen p-3 bg-slate-300 shadow w-60">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">Profile</h2>
          </div>
          <div className="flex-1 space-y-2">
            {routes?.map((route, i) => (
              <NavItem
                key={i}
                label={route.label}
                href={route.href}
                icon={route.icon}
                className="w-full py-2 flex items-center gap-2"
              />
            ))}
          </div>
          {isAuthenticated && (
            <button
              className="w-full flex items-center gap-2"
              onClick={() => dispatch(logout())}
            >
              <LogOut />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
