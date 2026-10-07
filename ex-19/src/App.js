import React from "react";
import animals from "./data/data";
import AnimalCard from "./animalcard";

function showAdditionalData(additional) {
  const alertInformation = Object.entries(additional)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  alert(alertInformation);
}

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Animals</h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {animals.map((animal) => (
          <AnimalCard
            key={animal.name}
            name={animal.name}
            scientificName={animal.scientificName}
            size={animal.size}
            diet={animal.diet}
            image={animal.image}
            additional={animal.additional}
            showAdditional={showAdditionalData}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
