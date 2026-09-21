import React from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import prdc from "./components/ProductCard";
import prdl from "./components/ProductList";
import footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <Banner />
      <prdc />
      <prdl />
      <footer />
    </div>
  );
};

export default App;
