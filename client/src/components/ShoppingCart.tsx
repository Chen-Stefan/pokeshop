import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../data/pokemonItems.json";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import trashbin from "../assets/images/trashBin.png";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, clearCart, cartItems } = useShoppingCart();
  const totalPrice = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((item) => item.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const navigate = useNavigate();

  useEffect(() => {
    if (totalPrice == 0) {
      closeCart();
    }
  }, [totalPrice]);

  const handleCreateCheckout = () => {
    // We want to get back our url so that user can access our page
    fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 1 },
        ],
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        // 试试 navigate
        console.log(url);
        // window.location = url
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  // const handleNavigateToCheckout = () => {
  //   closeCart();
  //   navigate("/checkout", {
  //     state: {
  //       paymentAmount: totalPrice
  //     },
  //   });
  // };

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-1">
        {totalPrice !== 0 && (
          <div className="d-flex">
            <button onClick={clearCart} className="ms-auto button__emptycart">
              <img
                src={trashbin}
                alt="trashbin"
                style={{ width: "18px", height: "18px" }}
              />
              Clear
            </button>
          </div>
        )}

        <Stack>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} totalPrice={totalPrice} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total CAD {formatCurrency(totalPrice)}
          </div>
        </Stack>

        {totalPrice !== 0 && (
          <button onClick={handleCreateCheckout} className="checkout">
            Checkout
          </button>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
