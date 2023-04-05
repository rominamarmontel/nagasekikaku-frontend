import React from 'react';
import './Search.css'
import { FaSearch } from 'react-icons/fa'

function Search(props) {
  return (
    <>
      <div className='Search'>
        <form onSubmit={props.handleSearch}>
          <FaSearch className='search-icon' />
          <input
            id="search-keyword"
            value={props.searchKeyword}
            type="text"
            placeholder='Search'
            onChange={props.handleInputChange}
          />
        </form>
      </div>
    </>
  );
}

export default Search;