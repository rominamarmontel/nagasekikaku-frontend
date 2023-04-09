import React from 'react';
import { FaSearch } from 'react-icons/fa'

function Search(props) {
  return (
    <>
      <div className='Search'>
        <form onSubmit={props.handleSearch} className='Search-form'>
          <input
            id="search-keyword"
            value={props.searchKeyword}
            type="text"
            placeholder='Search'
            onChange={props.handleInputChange}
          />
          <FaSearch className='search-icon' />
        </form>
      </div>
    </>
  );
}

export default Search;