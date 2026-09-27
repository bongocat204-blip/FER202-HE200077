import React, { useState, useEffect } from "react";

function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        textAlign: "center",
      }}
    >
      <h3>Bài 3: Window Resize Listener</h3>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        Window size: {windowSize.width} x {windowSize.height}
      </p>
    </div>
  );
}

export default WindowSize;
