"use client";
import { ReactNode } from "react";
import NavBar from "./_components/navbar";
import SideBar from "./_components/sidebar";

interface UserProfileLayoutProps {
  children: ReactNode;
  userType: string; // Example: 'student', 'recruiter', 'coordinator'
  onNavigate: (section: string) => void; // Function to handle navigation
}

const UserProfileLayout = ({
  children,
  userType,
  onNavigate,
}: UserProfileLayoutProps) => {
  return (
    <div className="h-full flex pt-5 overflow-y-auto">
      <SideBar userType={userType} onNavigate={onNavigate} />
      <main className="w-full justify-center flex">{children}</main>
    </div>
  );
};

export default UserProfileLayout;
