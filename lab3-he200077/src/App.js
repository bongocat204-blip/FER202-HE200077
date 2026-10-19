import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./context/ThemeContext";
import { products as initialProducts } from "./data/products";

export default function App() {
  const [products] = useState(initialProducts);

  return (
    <ThemeProvider>
      <div className="app-container">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<ProductList products={products} />}
          />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
