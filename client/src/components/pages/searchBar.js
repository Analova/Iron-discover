import React from 'react';

const Search = (props) => {
  return (
    <div>
      <input className="input search-bar" type="text" name="search" placeholder="Search"
        value={props.search}
        onChange={props.onChange}
      />
    </div>
  )

}

export default Search