"use client";

import type React from "react";
import { Users, LogOut } from "lucide-react";

interface NavBarProps {
  onSignOut: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSignOut }) => {
  return (
    <nav className="bg-white border-b  border-gray-200 px-4 py-2.5 fixed w-full top-0 left-0 z-10">
      <div className="flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="flex items-center">
          <Users className="h-6 w-6 mr-2" />
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            UserHub
          </span>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={onSignOut}
          className="flex items-center text-sm font-medium text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md px-3 py-1.5">
          <LogOut className="w-4 h-4 mr-1.5" />
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
