import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/pokemonItems.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
  totalPrice: number;
};

export function CartItem({ id, quantity, totalPrice }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((item) => item.id === id);
  if (item == null) return null;

  const handleCreateCheckout = () => {
    // We want to get back our url so that user can access our page
    fetch("/create-checkout-session", {
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
    }).then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
      // 试试 navigate
      window.location = url
    }).catch(e => {
      console.error(e.error)
    })
  };

  return (
    <>
      <Stack direction="horizontal" className="d-flex">
        <img
          src={item.imgUrl}
          style={{ width: "125px", height: "120px", objectFit: "cover" }}
        />
        <div className="me-auto">
          <div>
            {item.name}{" "}
            <div className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </div>
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div>{formatCurrency(item.price * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          className="float-end m-1"
          onClick={() => removeFromCart(item.id)}
        >
          &times;
        </Button>
      </Stack>
      <div className="ms-auto fw-bold fs-5">
        Total CAD {formatCurrency(totalPrice)}
      </div>
      {totalPrice !== 0 && (
        <button onClick={handleCreateCheckout} className="checkout">
          Checkout
        </button>
      )}
    </>
  );
}
