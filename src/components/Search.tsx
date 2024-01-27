import { TextField } from "@mui/material";
import React from "react";

interface SearchProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterValue: string;
}

function Search(props: SearchProps) {
  return (
    <TextField
      label="Търсене"
      value={props.filterValue}
      onChange={props.handleSearch}
      type="text"
      size="small"
      margin="normal"
      inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
    />
  );
}

export default Search;
