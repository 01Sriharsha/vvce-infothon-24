"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavItem from "@/components/globals/nav-items";
import { useAppSelector } from "@/store";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { isAuthenticated, data } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const href = useMemo(() => {
    if (data?.role === "STUDENT") {
      return "/u/student";
    } else if (data?.role === "COORDINATOR") {
      return "/u/placementOfficer";
    } else if (data?.role === "RECRUITER") {
      return "/u/recruiter";
    } else if (data?.role === "ADMIN") {
      return "/u/admin/verify";
    }
    return "";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <nav className="fixed inset-x-0 top-0 border-b border-b-zinc-700 z-50 bg-background">
      <div className="relative w-full py-4 px-2 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <h1 className="text-xl font-semibold">JobSeek</h1>
          </Link>
          <ul className="flex items-center gap-3">
            <NavItem label="About Us" href="/about" />
            {/* <NavItem label="Contact Us" href="/contact" /> */}
            <NavItem label="Jobs" href="/jobs" />
          </ul>
        </div>
        {!isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href={href}>
              <FaUserCircle role="button" size={"1.3rem"} />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
