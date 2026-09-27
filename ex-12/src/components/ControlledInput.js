import React, { useState } from "react";

function ControlledInput() {
  const [text, setText] = useState("");

  return (
    <div
      style={{
        textAlign: "center",
        margin: "20px",
        padding: "20px",
        border: "1px solid #ccc",
      }}
    >
      <h3>Bài 2: Controlled Input Field</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập dữ liệu..."
      />
      <h2>Input text: {text}</h2>
    </div>
  );
}

export default ControlledInput;
