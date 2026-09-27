import React, { useState } from "react";

function ColorSwitcher() {
  const [color, setColor] = useState("");

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}>
      <h3>Bài 5: Color Switcher</h3>
      <select
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="">Select a color</option>
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Green">Green</option>
        <option value="Yellow">Yellow</option>
      </select>

      {color && (
        <div
          style={{
            marginTop: "15px",
            width: "150px",
            height: "150px",
            backgroundColor: color.toLowerCase(),
          }}
        />
      )}
    </div>
  );
}

export default ColorSwitcher;
