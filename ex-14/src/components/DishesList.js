import React from "react";
import { DISHES } from "../data/dishes";
import { useCart } from "../context/CartContext";

function DishesList() {
  const { addToCart } = useCart();

  return (
    <div style={{ flex: 2, paddingRight: "20px" }}>
      <h2>Menu Dishes</h2>
      <div style={{ display: "grid", gap: "15px" }}>
        {DISHES.map((dish) => (
          <div
            key={dish.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h4>
              {dish.name} - ${dish.price}
            </h4>
            <p>{dish.description}</p>
            <button
              onClick={() => addToCart(dish)}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DishesList;
