import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { FaBlog } from "react-icons/fa";
import { FaComments } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { GoDot } from "react-icons/go";
import { RouteIndex } from "@/helpers/RouteNames";

function AppSidebar() {
  return (
    <Sidebar className={`mt-15`}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={RouteIndex}><FaHome className="text-red-500"/>Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link><BiCategoryAlt className="text-red-500"/>Category</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link><FaBlog className="text-red-500"/>Blog</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link><FaComments className="text-red-500"/>Comments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link><FaUsers className="text-red-500"/>Users</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarGroupLabel className="pt-10">Categories</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link><GoDot className="text-red-500"/>Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
