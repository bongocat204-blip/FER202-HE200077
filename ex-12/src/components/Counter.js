import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        textAlign: "center",
        margin: "20px",
        padding: "20px",
        border: "1px solid #ccc",
      }}
    >
      <h3>Bài 1: Counter Component</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <h2>Count: {count}</h2>
    </div>
  );
}

export default Counter;
