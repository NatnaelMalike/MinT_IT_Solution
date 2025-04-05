import React from "react";
import Sidebar from "./sidebar";
import TopNav from "./top-nav";
import { Outlet } from "react-router-dom";

const Userlayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Userlayout;
