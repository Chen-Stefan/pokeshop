import React, { PropsWithChildren, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TYPE_COLORS: { [key: string]: any } = {
  bug: "#C2D020",
  dark: "#8E6A57",
  dragon: "#8B77FE",
  electric: "#FDE63F",
  fairy: "#F9AEFF",
  fighting: "#A4583F",
  fire: "#FA5643",
  flying: "#79A4FF",
  ghost: "#7A75D3",
  grass: "#8CD851",
  ground: "#EBCD55",
  ice: "#94F1FE",
  normal: "#BBBCAB",
  poison: "#AA5DA2",
  psychic: "#F45FAE",
  rock: "#CEBC72",
  steel: "#C4C2DA",
  water: "#55AEFF",
};

export default function PokemonProfile(): JSX.Element {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [types, setTypes] = useState([]);
  const [description, setDescription] = useState("");
  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");
  const [speed, setSpeed] = useState("");
  const [specialAttack, setSpecialAttack] = useState("");
  const [specialDefense, setSpecialDefense] = useState("");

  //URLs for pokemon information
  const params = useParams();
  const pokemonIndex = params.pokemonIndex;
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;

  // Grab pokemon data
  useEffect(() => {
    getPokemonData();
  }, []);

  async function getPokemonData() {
    const pokemonRes = await axios.get(pokemonUrl);
    // Set name, pokemonIndex, imageUrl
    setName(pokemonRes.data.name);
    
    const officialImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`
    setImageUrl(officialImageUrl);

    // set pokemon types
    const pokemonTypes = pokemonRes.data.types.map(
      (type: any) => type.type.name
    );
    setTypes(pokemonTypes);

    //Get and set pokemon description. Have to use the pokemonSpecies url
    await axios.get(pokemonSpeciesUrl).then((res) => {
      let description = "";
      res.data.flavor_text_entries.some(
        (flavor: { language: { name: string }; flavor_text: string }) => {
          if (flavor.language.name == "en") {
            description = flavor.flavor_text;
            return;
          }
        }
      );
      setDescription(description);
    });

    // Set 6 pokemon stats
    pokemonRes.data.stats.map(
      (stat: { [x: string]: any; stat: { name: any } }) => {
        switch (stat.stat.name) {
          case "hp":
            setHp(stat["base_stat"]);
            break;
          case "attack":
            setAttack(stat["base_stat"]);
            break;
          case "defense":
            setDefense(stat["base_stat"]);
            break;
          case "speed":
            setSpeed(stat["base_stat"]);
            break;
          case "special-attack":
            setSpecialAttack(stat["base_stat"]);
            break;
          case "special-defense":
            setSpecialDefense(stat["base_stat"]);
            break;
        }
      }
    );
  }

  return (
    <div className="col mt-2 mb-3">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-5">
              <h4 className="mx-auto">
                {name
                  .toLowerCase()
                  .split(" ")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              </h4>
            </div>
            <div className="col-7">
              <div className="float-start">
                {types.map((type: string) => (
                  <span
                    key={type}
                    className="badge bg-pill mr-1"
                    style={{
                      backgroundColor: `${TYPE_COLORS[type]}`,
                      color: "white",
                    }}
                  >
                    {type
                      .toLowerCase()
                      .split(" ")
                      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(" ")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-3">
              <img
                src={imageUrl}
                className="card-img-top rounded mx-auto mt-2"
                style= {{width: "180px", height: "180px"}}
              />
            </div>
            <div className="row">
              <div className="col fs-5 fw-bold">
                <p>{description}</p>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row align-items-center">
                <div className="col-12 col-md-3">HP</div>
                <div className="col-12 col-md-9">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressBar"
                      style={{
                        width: `${hp}%`,
                      }}
                      area-valuenow="25"
                      area-aria-valuemin="0"
                    >
                      <small>{hp}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-12 col-md-3">Attack</div>
                <div className="col-12 col-md-9">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressBar"
                      style={{
                        width: `${attack}%`,
                      }}
                      area-valuenow="25"
                      area-aria-valuemin="0"
                    >
                      <small>{attack}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-12 col-md-3">Defense</div>
                <div className="col-12 col-md-9">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressBar"
                      style={{
                        width: `${defense}%`,
                      }}
                      area-valuenow="25"
                      area-aria-valuemin="0"
                    >
                      <small>{defense}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-12 col-md-3">Speed</div>
                <div className="col-12 col-md-9">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressBar"
                      style={{
                        width: `${speed}%`,
                      }}
                      area-valuenow="25"
                      area-aria-valuemin="0"
                    >
                      <small>{speed}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-12 col-md-3">Special Attack</div>
                <div className="col-12 col-md-9">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressBar"
                      style={{
                        width: `${specialAttack}%`,
                      }}
                      area-valuenow="25"
                      area-aria-valuemin="0"
                    >
                      <small>{specialAttack}</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-12 col-md-3">Special Defense</div>
                <div className="col-12 col-md-9">
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressBar"
                      style={{
                        width: `${specialDefense}%`,
                      }}
                      area-valuenow="25"
                      area-aria-valuemin="0"
                    >
                      <small>{specialDefense}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
