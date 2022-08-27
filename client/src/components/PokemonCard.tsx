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
      </Link>
      {quantity === 0 ? (
        <>
          <div className="detail-wrapper">
            <h3>{name}</h3>
          </div>
          <button
            className="add-to-cart-button button-primary button-purchase"
            onClick={() => increaseCartQuantity(id)}
            type="button"
          >
            Add to cart
          </button>
        </>
      ) : (
        <div
          className="d-flex align-items-center flex-column"
          style={{ gap: "0.9rem" }}
        >
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ gap: "0.8rem" }}
          >
            <button className="button__qtychange" onClick={() => decreaseCartQuantity(id)}>-</button>
            <div>
              <span className="fs-3">{quantity}</span>
            </div>
            <button className="button__qtychange" onClick={() => increaseCartQuantity(id)}>+</button>
          </div>
          <Button variant="danger" className="fw-bold" onClick={() => RemoveFromCart(id)}>
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
