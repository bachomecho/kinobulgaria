import React from "react";

interface SearchProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterValue: string;
}

function Search(props: SearchProps) {
  return (
    <input
      type="text"
      id="searchField"
      value={props.filterValue}
      onChange={props.handleSearch}
      placeholder="Tърсене"
    />
  );
}

export default Search;
