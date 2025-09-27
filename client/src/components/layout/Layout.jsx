import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import AppSidebar from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

function Layout() {
  return (
    <SidebarProvider >
      {/* Topbar */}
      <Topbar />

      <div className="flex w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <main className="pt-15 w-full">
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
