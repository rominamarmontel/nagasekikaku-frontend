import React from 'react';
import './Search.css'

function Search({ handleInputChange, searchKeyword }) {
  return (
    <>
      <div className='Search'>
        <input
          id="search-keyword"
          value={searchKeyword}
          type="text"
          placeholder='Search'
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}

export default Search