import React from "react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, clearCart, totalCount, totalValue } =
    useCart();

  return (
    <div
      style={{
        flex: 1,
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>Your Cart</h2>
      <p>
        <strong>Total Items:</strong> {totalCount}
      </p>
      <p>
        <strong>Total Value:</strong> ${totalValue}
      </p>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span>
                  {item.name} x {item.quantity} ($
                  {(parseFloat(item.price) * item.quantity).toFixed(2)})
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={clearCart}
            style={{
              width: "100%",
              backgroundColor: "#ffc107",
              padding: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
