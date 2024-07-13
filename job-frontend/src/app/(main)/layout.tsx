import Navbar from "@/components/globals/navbar";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="mt-[40px]">{children}</div>
    </div>
  );
};

export default MainLayout;
