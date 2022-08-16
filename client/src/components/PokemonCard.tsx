import React from "react";
import { Link } from "react-router-dom";

export default function PokemonCard({
  id,
  name,
  image,
  type,
}: {
  id: number;
  name: string;
  image: string;
  type: string;
}) {
  // 临时数据 
  let quantity = 0
  const style = `thumb-container ${type}`;
  return (
    <div className={style}>
      {/* <div className="style">
      <small>#0{id}</small>
    </div> */}
      <Link
        style={{ color: "black", textDecoration: "none" }}
        to={`pokemon/${id}`}
      >
        <img src={image} alt={name} />
        <div className="detail-wrapper">
          <h3>{name}</h3>
          <small>Type: {type}</small>
        </div>
      </Link>
      <button className="add-to-cart-button button-primary button-purchase" type="button">
        Add to cart
      </button>
    </div>
  );
}
