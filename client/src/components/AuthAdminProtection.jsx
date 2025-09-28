import { RouteLogin } from '@/helpers/RouteNames';
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AuthAdminProtection() {
   const  user  = useSelector((state) => state.user);
   console.log(user);
   
  
  if (user && user.isLogedIn && user.user.user.role === 'admin') {
    return <Outlet />;
  }else{
   return <Navigate to={RouteLogin}/>
  }
}

export default AuthAdminProtection