import React, { useState } from "react";

const SnapshotDemo = () => {
  const [count, setCount] = useState(0);
  const [snapshot, setSnapshot] = useState(null);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleSnapshot = () => {
    setSnapshot(count);
  };

  const handleRestore = () => {
    if (snapshot !== null) {
      setCount(snapshot);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>State as a Snapshot Demo</h1>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleSnapshot}>Take Snapshot</button>
      <button onClick={handleRestore}>Restore Snapshot</button>
    </div>
  );
};

export default SnapshotDemo;
