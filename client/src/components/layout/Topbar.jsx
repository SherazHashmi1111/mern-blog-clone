import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { RouteLogin } from "@/helpers/RouteNames";
import { Input } from "../ui/input";
import logoImg from '../../assets/birdLogo.png'

function Topbar() {
  const [search, setSearch] = useState('');
  const inputChangeHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
      console.log(search);
      setSearch('')
    }

  return (
    <div className="w-full h-12 px-5 fixed flex justify-between items-center z-20">
      <div className="flex  gap-2 items-center justify-center">
        <div className=""><img src={logoImg} className="w-20" /></div>
        <div className="font-[Bonheur_Royale] text-3xl font-bold text-red-500">E Blog</div>
      </div>
      <form className="flex gap-3" onSubmit={searchSubmitHandler}>
        <Input className="w-100" onChange={inputChangeHandler} value={search}/>
        <Button>Search</Button>
      </form>
      <div className="">
        <Button asChild>
          <Link to={RouteLogin}>Login</Link>
        </Button>
      </div>
    </div>
  );
}

export default Topbar;
