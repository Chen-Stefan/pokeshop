import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({
  id,
  name,
  image,
  type,
}: {
  id: number;
  name: string;
  image: string;
  type: string;
}) => {
  const style = `thumb-container ${type}`;
  return (
    <Link to={`pokemon/${this.state.pokemonIndex}`}><div className={style}>
    <div className="style">
      <small>#0{id}</small>
    </div>
    <img src={image} alt={name} />
    <div className="detail-wrapper">
      <h3>{name}</h3>
      <small>Type: {type}</small>
    </div>
  </div></Link>
    
  );
};

export default PokemonCard;
