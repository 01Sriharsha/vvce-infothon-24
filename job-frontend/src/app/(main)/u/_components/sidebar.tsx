import Image from "next/image";
import { FC } from "react";
import { UserPen } from "lucide-react";
import { ListCollapse } from "lucide-react";

interface SideBarProps {
  userType: string;
  onNavigate: (section: string) => void;
}

const SideBar: FC<SideBarProps> = ({ userType, onNavigate }) => {
  
  return (
    <div className="flex">
      <div className="flex flex-col h-screen p-3 bg-slate-300 shadow w-60">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">Profile</h2>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <a
                  onClick={() => onNavigate("basic")}
                  className="flex items-center p-2 space-x-3 rounded-md cursor-pointer"
                >
                 <UserPen />
                  <span>Basic Details</span>
                </a>
              </li>
              <li className="rounded-sm">
                <a
                  onClick={() => onNavigate("role")}
                  className="flex items-center p-2 space-x-3 rounded-md cursor-pointer"
                >
                  <ListCollapse />
                  <span>Role Details</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
