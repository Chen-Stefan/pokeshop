import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

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
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    RemoveFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  const style = `thumb-container ${type}`;
  return (
    <div className={style}>
     
      <Link
        style={{ color: "black", textDecoration: "none" }}
        to={`pokemon/${id}`}
      >
        <img src={image} alt={name} />
        <div className="detail-wrapper">
          {id}
          <h3>{name}</h3>
        </div>
      </Link>
      {quantity === 0 ? (
        <button
          className="add-to-cart-button button-primary button-purchase"
          onClick={() => increaseCartQuantity(id)}
          type="button"
        >
          Add to cart
        </button>
      ) : (
        <div
          className="d-flex align-items-center flex-column"
          style={{ gap: "0.5rem" }}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ gap: "0.5rem" }}
          >
            <button onClick={() => decreaseCartQuantity(id)}>-</button>
            <div>
              <span className="fs-3">{quantity}</span> in cart
            </div>
            <button onClick={() => increaseCartQuantity(id)}>+</button>
          </div>
          <Button variant="danger" size="sm" onClick={() => RemoveFromCart(id)}>
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
