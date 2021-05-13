import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Cart.css";

import { CartContext } from "../contexts/cartContext";

function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <NavLink to="/checkout">
      <div className="cart-link rounded-circle text-primary bg-white d-flex align-items-center">
        <i className="bi bi-cart-fill">
          <span className="badge badge-pill badge-primary">{cart.length}</span>
        </i>
      </div>
    </NavLink>
  );
}

export default Cart;
