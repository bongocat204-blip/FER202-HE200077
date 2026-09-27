import React from "react";
import { useTheme } from "../context/ThemeContext";

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: theme.background,
        color: theme.foreground,
        textAlign: "center",
        margin: "20px 0",
      }}
    >
      <p>Current Theme Container</p>
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: theme.background,
          color: theme.foreground,
          border: "1px solid #000",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemeButton;
