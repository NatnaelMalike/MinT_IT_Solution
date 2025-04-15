import React from "react";
import Sidebar from "../layout/sidebar";
import TopNav from "../layout/top-nav";
import { Outlet } from "react-router-dom";
import { userNavItems } from "@/constants/navigation";

const Userlayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar navItems={userNavItems} />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Userlayout;
