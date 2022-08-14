import { AppBar, TextField, Toolbar } from "@mui/material";
import React from "react";
import PokemonGrid from "../components/PokemonGrid";

export default function Search() {
  const handleFilterByType = () => {};

  const handleFilterByRegion = () => {};

  const handleSearchByName = () => {};

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

        <div className="filter__items">
          {/* <label>Search by name</label> */}
          <AppBar position="static">
        <Toolbar>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              onChange={handleSearchChange}
              className={classes.searchInput}
              label="Pokemon"
              variant="standard"
            />
          </div>
        </Toolbar>
      </AppBar>
        </div>
      </div>

      <PokemonGrid />
    </>
  );
}
