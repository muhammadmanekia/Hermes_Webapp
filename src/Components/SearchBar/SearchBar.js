import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const SearchBar = () => {
  const [setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div style={{ display: "flex" }}>
      <TextField
        id="filled-search"
        placeholder="Search Posts"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                style={{
                  color: "gray",
                }}
              />
            </InputAdornment>
          ),
        }}
        type="search"
        variant="outlined"
        fullWidth
        style={{ float: "right", marginTop: "auto", width: "40vh" }}
        onChange={(event) => handleSearch(event)}
      />
    </div>
  );
};

export default SearchBar;
