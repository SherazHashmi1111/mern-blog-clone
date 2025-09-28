import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { RouteSearch } from "@/helpers/RouteNames";

function SearchBox() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const inputChangeHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    navigate(RouteSearch(search));
    console.log(search);
    setSearch("");
  };
  return (
    <form className="flex gap-3" onSubmit={searchSubmitHandler}>
      <Input className="w-100" onChange={inputChangeHandler} value={search} />
      <Button>Search</Button>
    </form>
  );
}

export default SearchBox;
