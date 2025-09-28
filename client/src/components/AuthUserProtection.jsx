import { RouteIndex } from "@/helpers/RouteNames";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AuthUserProtection() {
  const  user  = useSelector((state) => state.user);
  if (user && user?.isLoggedIn ) {
      return <Outlet />;
    }else{
     return <Navigate to={RouteIndex}/>
    }
}

export default AuthUserProtection;