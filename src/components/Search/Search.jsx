import React from 'react';
import './Search.css'

function Search(props) {
  return (
    <>
      <div className='Search'>
        <form onSubmit={props.handleSearch}>
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