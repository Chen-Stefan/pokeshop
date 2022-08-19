import { AppBar, TextField, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { ChangeEvent, useState } from "react";
import PokemonGrid from "../components/PokemonGrid";

export default function Search() {
  const options = [
    {value: '', text: '--Choose a Type--'},
    {value: 'Normal', text: 'Normal'},
    {value: 'Fighting', text: 'Fighting'},
    {value: 'Flying', text: 'Flying'},
    {value: 'Ground', text: 'Ground'},
    {value: 'Rock', text: 'Rock'},
    {value: 'Bug', text: 'Bug'},
    {value: 'Ghost', text: 'Ghost'},
    {value: 'Steel', text: 'Steel'},
    {value: 'Fire', text: 'Fire'},
    {value: 'Water', text: 'Water'},
    {value: 'Grass', text: 'Grass'},
    {value: 'Electric', text: 'Electric'},
    {value: 'Psychic', text: 'Psychic'},
    {value: 'Ice', text: 'Ice'},
    {value: 'Dragon', text: 'Dragon'},
    {value: 'Dark', text: 'Dark'},
    {value: 'Fairy', text: 'Fairy'}
  ];
  const [nameFilter, setNameFilter] = useState("");
  const [selected, setSelected] = useState(options[0].value)
  
  const handleSelectedChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };
  
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

  return (
    <>
      <div className="filter__container justify-content-center">
        <div className="filter__items">
          <div>Type</div>
          <select
            onChange={handleSelectedChange}
            style={{fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", fontSize: "16px"}}
          >
            <option value="All types">All Types</option>
            <option value="normal">Normal</option>
            <option value="fighting">Fighting</option>
            <option value="flying">Flying</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="rock">Rock</option>
            <option value="bug">Bug</option>
            <option value="ghost">Ghost</option>
            <option value="steel">Steel</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="psychic">Psychic</option>
            <option value="ice">Ice</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="fairy">Fairy</option>
          </select>
        </div>

        {/* <div className="filter__items">
          <div>Region</div>
          <select
            value="{this.props.valueregion}"
            onChange={handleFilterByRegion}
          ></select>
        </div> */}

        {/* <div className="filter__items"> */}
        <div style={{ marginTop: "-15px" }}>
          <TextField
            value={nameFilter}
            onChange={handleSearchChange}
            className="searchInput"
            label="Search"
            variant="standard"
          />
          <SearchIcon style={{ marginTop: "20px", paddingRight: "2px" }} />
        </div>
      </div>

      <PokemonGrid nameFilter={nameFilter} />
    </>
  );
}
