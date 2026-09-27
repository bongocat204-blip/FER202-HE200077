import React from "react";
import Counter from "./components/Counter";
import ControlledInput from "./components/ControlledInput";
import ToggleVisibility from "./components/ToggleVisibility";
import TodoList from "./components/TodoList";
import ColorSwitcher from "./components/ColorSwitcher";
import SearchFilter from "./components/SearchFilter";
import DragAndDropList from "./components/DragAndDropList";

function App() {
  return (
    <div
      style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}
    >
      <h1 style={{ textAlign: "center" }}>
        Exercise 12: React Hook (useState)
      </h1>
      <Counter />
      <ControlledInput />
      <ToggleVisibility />
      <TodoList />
      <ColorSwitcher />
      <SearchFilter />
      <DragAndDropList />
    </div>
  );
}

export default App;
