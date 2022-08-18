import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../data/pokemonItems.json";
import { useNavigate } from "react-router-dom";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const totalPrice = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((item) => item.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const navigate = useNavigate();
  const handleNavigateToCheckout = (e: any) => {
    navigate('/checkout', {
      state: {
        paymentAmount: totalPrice
      }
    })
  }

  return (
    // Offcanvas is the sliding effect
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total CAD {formatCurrency(totalPrice)}
          </div>

          
        </Stack>
        <button onClick={handleNavigateToCheckout} className="checkout">Checkout</button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
