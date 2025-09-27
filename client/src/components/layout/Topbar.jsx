import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RouteLogin, RouteProfile } from "@/helpers/RouteNames";
import logoImg from "../../assets/birdLogo.png";
import SearchBox from "../SearchBox";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userImg from "../../assets/user.png";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdOutlineAccountBalance } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { SidebarTrigger } from "../ui/sidebar";
function Topbar() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  // Profile picture handling
  const avatar = user?.user?.user?.avatar;
  
  const logoutHandler = async () => {
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const resData = await res.json();

      // handle HTTP errors (non-2xx)
      if (!res.ok) {
        showToast("error", resData?.message || "Something went wrong!");
        return;
      }

      showToast("success", "User logout successfully!");
      navigate(RouteLogin);
    } catch (error) {
      showToast(
        "error",
        error?.message || "Something went wrong in register user"
      );
    }
  };
  return (
    <div className="w-full h-15 px-5 fixed flex justify-between items-center z-20 border-b-1 bg-white">
      <div className="  gap-2 items-center justify-center hidden sm:flex">
        <div className="">
          <img src={logoImg} className="w-20 h-20 rounded-full" />
        </div>
        <div className="font-[Bonheur_Royale] text-3xl font-bold text-red-500 ">
          E Blog
        </div>
      </div>
      <div className="sm:hidden">
        <SidebarTrigger>
          <RxHamburgerMenu size={32} className="cursor-pointer" />
        </SidebarTrigger>
      </div>
      <div className="flex items-center">
        {/* Show SearchBox on screens >= sm */}
        <div className="hidden sm:block">
          <SearchBox />
        </div>

        {/* Show Icon on screens < sm */}
        <div className="block sm:hidden">
          <IoSearchOutline className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
      <div className="">
        {user && user?.isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-12 h-12 cursor-pointer">
                <AvatarImage src={avatar || userImg} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel className="flex gap-2 items-center">
                <MdOutlineAccountBalance className="text-green-800" /> My
                Account
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                <Link to={RouteProfile}>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <CgProfile className="text-green-800" />
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <Link to={RouteProfile}>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <FaPlus className="text-green-800" />
                    Add Blog
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logoutHandler}
                className="flex gap-2 items-center"
              >
                <RiLogoutBoxLine className="text-red-500" />
                Logout
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link to={RouteLogin}>Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Topbar;
