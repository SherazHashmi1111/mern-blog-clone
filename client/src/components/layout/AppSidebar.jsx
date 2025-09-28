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
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { FaBlog } from "react-icons/fa";
import { FaComments } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { GoDot } from "react-icons/go";
import {
  RouteAddCategory,
  RouteCategories,
  RouteIndex,
  RouteBlog,
  RouteCategoryBlogs,
  RouteComments,
  RouteUsers,
} from "@/helpers/RouteNames";
import useFetch from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

function AppSidebar() {
  const  user  = useSelector((state) => state.user);
  
   const { data, error, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return (
    <Sidebar className={`mt-15`}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={RouteIndex}>
                  <FaHome className="text-red-500" />
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {user.user.user.role === 'admin'|| 'user' ? <><SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={RouteCategories}>
                  <BiCategoryAlt className="text-red-500" />
                  Category
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={RouteBlog}>
                  <FaBlog className="text-red-500" />
                  Blog
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem></>:<></>}

            { user.user.user.role === 'admin' ? <><SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={RouteComments}>
                  <FaComments className="text-red-500" />
                  Comments
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={RouteUsers}>
                  <FaUsers className="text-red-500" />
                  Users
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem></> : <></>}

          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
         {/* Side bar Categories group */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data && data?.categories?.length > 0 ? (
                data.categories.map((category, index) => (
                  
                  <SidebarMenuItem key={index}>
                    <SidebarMenuSubButton asChild>
                      <Link to={RouteCategoryBlogs(category.slug)}>
                        <GoDot color="red" />
                        {category.name}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <SidebarMenuItem key={"no-category"}>
                  <SidebarMenuSubButton asChild>
                    <Link to="/">
                      <GoDot className="mr-2" />
                      {/* This is dynamic will be change later */}
                      No category
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
