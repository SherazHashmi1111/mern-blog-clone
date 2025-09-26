import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import AppSidebar from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

function Layout() {
  return (
    <SidebarProvider>
      {/* Topbar */}
      <Topbar />

      <div className="flex">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <main className="pt-15 w-full min-h-screen">
          {/* Place trigger where you want to toggle sidebar (e.g. in Topbar or inside mobile header) */}
          {/* <SidebarTrigger /> */}
          <Outlet />
          {/* footer */}
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Layout;
