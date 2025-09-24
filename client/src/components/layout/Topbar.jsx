import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { RouteLogin } from "@/helpers/RouteNames";
import logoImg from '../../assets/birdLogo.png'
import SearchBox from "../SearchBox";

function Topbar() {
  

  return (
    <div className="w-full h-12 px-5 fixed flex justify-between items-center z-20">
      <div className="flex  gap-2 items-center justify-center">
        <div className=""><img src={logoImg} className="w-20" /></div>
        <div className="font-[Bonheur_Royale] text-3xl font-bold text-red-500">E Blog</div>
      </div>
      <SearchBox/>
      <div className="">
        <Button asChild>
          <Link to={RouteLogin}>Login</Link>
        </Button>
      </div>
    </div>
  );
}

export default Topbar;
