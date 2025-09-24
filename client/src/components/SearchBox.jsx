import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';

function SearchBox() {
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
    <form className="flex gap-3" onSubmit={searchSubmitHandler}>
        <Input className="w-100" onChange={inputChangeHandler} value={search}/>
        <Button>Search</Button>
      </form>
  )
}

export default SearchBox