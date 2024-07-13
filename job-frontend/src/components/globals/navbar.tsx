"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavItem from "@/components/globals/nav-items";

export default function Navbar() {
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
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
