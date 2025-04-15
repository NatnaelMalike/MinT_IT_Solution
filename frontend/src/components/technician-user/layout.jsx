import React from "react";

import { Outlet } from "react-router-dom";
import TopNav from "../layout/top-nav";
import Sidebar from "../layout/sidebar";
import { technicianNavItems } from "@/constants/navigation";
import { Toaster } from "../ui/sonner";

const TechnicianLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar navItems={technicianNavItems} />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default TechnicianLayout;
