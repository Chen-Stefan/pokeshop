import { AppBar, TextField, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { ChangeEvent, useState } from "react";
import PokemonGrid from "../components/PokemonGrid";

export default function Search() {
  const [filter, setFilter] = useState('');
  const handleFilterByType = () => {};

  const handleFilterByRegion = () => {};

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className="filter__container justify-content-center">
        <div className="filter__items">
          <div>Type</div>
          <select
            value="{this.props.valuetype}"
            onChange={handleFilterByType}
          ></select>
        </div>

        <div className="filter__items">
          <div>Region</div>
          <select
            value="{this.props.valueregion}"
            onChange={handleFilterByRegion}
          ></select>
        </div>

        {/* <div className="filter__items"> */}
        <div style={{ marginTop: "-15px" }}>
          <TextField
            value = {filter}
            onChange={handleSearchChange}
            className="searchInput"
            label="Search"
            variant="standard"
          />
          <SearchIcon style={{ marginTop: "20px", paddingRight: "2px" }} />
        </div>
      </div>

      <PokemonGrid filter={filter}/>
    </>
  );
}
