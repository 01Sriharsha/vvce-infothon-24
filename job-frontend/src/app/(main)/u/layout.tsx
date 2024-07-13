"use client";
import { ReactNode } from "react";
import SideBar from "./_components/sidebar";

interface UserProfileLayoutProps {
  children: ReactNode;
  userType: string; // Example: 'student', 'recruiter', 'coordinator'
  onNavigate: (section: string) => void; // Function to handle navigation
}

const UserProfileLayout = ({ children }: UserProfileLayoutProps) => {
  return (
    <div className="h-full flex pt-5 overflow-y-auto">
      <SideBar />
      <main className="w-full justify-center flex">{children}</main>
    </div>
  );
};

export default UserProfileLayout;
