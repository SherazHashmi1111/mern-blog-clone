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

function Topbar() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

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
    <div className="w-full h-12 px-5 fixed flex justify-between items-center z-20 border-b-1">
      <div className="flex  gap-2 items-center justify-center">
        <div className="">
          <img src={logoImg} className="w-20" />
        </div>
        <div className="font-[Bonheur_Royale] text-3xl font-bold text-red-500">
          E Blog
        </div>
      </div>
      <SearchBox />
      <div className="">
        {user && user?.isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-15 h-15 cursor-pointer">
                <AvatarImage src={ userImg} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                  <Link to={RouteProfile}>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                  </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logoutHandler}>
                Log out
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
