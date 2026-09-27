import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import ThemeButton from "./components/ThemeButton";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            Exercise 14: React Hook (useContext)
          </h1>

          {/* Exercise 1 */}
          <ThemeButton />

          {/* Exercise 2 & 3 */}
          <div style={{ display: "flex", marginTop: "20px" }}>
            <DishesList />
            <Cart />
          </div>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
