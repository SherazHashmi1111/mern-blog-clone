import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import AppSidebar from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

function Layout() {
  return (
    <>
      {/* //topbar  */}
      <Topbar />
      {/* //Sidebar  */}
       <SidebarProvider>

      <AppSidebar />
      <main className="pt-12 w-full min-h-screen">
        {/* <SidebarTrigger />  */}
        <Outlet />
        {/* footer  */}
      </main>
       </SidebarProvider>
    </>
  );
}

export default Layout;
