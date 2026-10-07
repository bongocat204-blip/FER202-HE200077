import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <h2>Mini Task Manager</h2>
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}
// icon⭐