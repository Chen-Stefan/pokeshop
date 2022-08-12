import React from "react";

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
    <div className={style}>
      <div className="style">
        <small>#0{id}</small>
      </div>
      <img src={image} alt={name} />
      <div className="detail-wrapper">
        <h3>{name}</h3>
        <small>Type: {type}</small>
      </div>
    </div>
  );
};

export default PokemonCard;
