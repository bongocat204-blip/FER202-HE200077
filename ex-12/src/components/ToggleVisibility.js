import React, { useState } from "react";

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      style={{
        textAlign: "center",
        margin: "20px",
        padding: "20px",
        border: "1px solid #ccc",
      }}
    >
      <h3>Bài 3: Toggle Visibility</h3>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"}
      </button>
      {isVisible && <h2>Toggle me!</h2>}
    </div>
  );
}

export default ToggleVisibility;
