import React, { useState } from "react";

const RenderAndCommitDemo = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Render and Commit Demo</h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export default RenderAndCommitDemo;
