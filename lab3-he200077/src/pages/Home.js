import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Welcome to productstore</h1>
      <p>Manage and explore products for your needs</p>
      <button className="btn-view" onClick={() => navigate("/products")}>
        [ViewProduct]
      </button>
    </div>
  );
}
