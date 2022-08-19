import { AppBar, TextField, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { ChangeEvent, useState } from "react";
import PokemonGrid from "../components/PokemonGrid";

export default function Search() {
  const [filter, setFilter] = useState("");
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
            onChange={handleFilterByType}
            style={{fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", fontSize: "16px"}}
          >
            <option value="normal">normal</option>
            <option value="fighting">fighting</option>
            <option value="flying">flying</option>
            <option value="poison">poison</option>
            <option value="ground">ground</option>
            <option value="rock">rock</option>
            <option value="bug">bug</option>
            <option value="ghost">ghost</option>
            <option value="steel">steel</option>
            <option value="fire">fire</option>
            <option value="water">water</option>
            <option value="grass">grass</option>
            <option value="electric">electric</option>
            <option value="psychic">psychic</option>
            <option value="ice">ice</option>
            <option value="dragon">dragon</option>
            <option value="dark">dark</option>
            <option value="fairy">fairy</option>
          </select>
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
            value={filter}
            onChange={handleSearchChange}
            className="searchInput"
            label="Search"
            variant="standard"
          />
          <SearchIcon style={{ marginTop: "20px", paddingRight: "2px" }} />
        </div>
      </div>

      <PokemonGrid filter={filter} />
    </>
  );
}
