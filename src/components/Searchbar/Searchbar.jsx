import { useState } from 'react';
import PropTypes from 'prop-types';
import {  toast } from 'react-toastify';
import css from './Seachbar.module.css';
import { FiSearch } from 'react-icons/fi';
import { IconContext } from "react-icons";

export function Searchbar ({onSubmit}) {

  const [search, setSearch] = useState('');

  const inputChange = e => setSearch(e.currentTarget.value)

  const handleSubmit = e => {
    e.preventDefault();
    if(search.trim() === ''){
      return toast.error('Oops! Something went wrong! Please try again.')
    }
    onSubmit(search.toLowerCase());
    setSearch('')
  }
 
 

    return (
    
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.searchForm_button}>
            <span > <IconContext.Provider value={{ color: "#3f51b5", size: "2em" }}>
<FiSearch />
</IconContext.Provider></span>
          </button>

          <input className={css.searchForm_input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={inputChange}
            value={search}
          />
        </form>
          
      </header>
    
    );
  };


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};