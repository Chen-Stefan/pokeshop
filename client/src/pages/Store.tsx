import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";
import PokemonGrid from "../components/PokemonGrid";

export default function Store() {
  const options = [
    { value: "", text: "-- All Types --" },
    { value: "normal", text: "Normal" },
    { value: "fighting", text: "Fighting" },
    { value: "flying", text: "Flying" },
    { value: "ground", text: "Ground" },
    { value: "rock", text: "Rock" },
    { value: "bug", text: "Bug" },
    { value: "ghost", text: "Ghost" },
    { value: "steel", text: "Steel" },
    { value: "fire", text: "Fire" },
    { value: "water", text: "Water" },
    { value: "grass", text: "Grass" },
    { value: "electric", text: "Electric" },
    { value: "psychic", text: "Psychic" },
    { value: "ice", text: "Ice" },
    { value: "dragon", text: "Dragon" },
    { value: "dark", text: "Dark" },
    { value: "fairy", text: "Fairy" },
  ];
  const [nameFilter, setNameFilter] = useState("");
  const [selectedType, setSelectedType] = useState(options[0].value);

  const handleSelectedTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
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
            value = {selectedType}
            onChange={handleSelectedTypeChange}
            style={{
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              fontSize: "16px",
            }}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>

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

      <PokemonGrid nameFilter={nameFilter} selectedType={selectedType} />
    </>
  );
}
