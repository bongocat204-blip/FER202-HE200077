import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputTask, setInputTask] = useState("");

  const handleAddTodo = () => {
    if (inputTask.trim() === "") return;
    setTodos([...todos, inputTask]);
    setInputTask("");
  };

  const handleDeleteTodo = (indexToDelete) => {
    setTodos(todos.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}>
      <h3>Bài 4: Todo List</h3>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Please input a Task"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            marginLeft: "5px",
            border: "none",
            padding: "5px 10px",
          }}
        >
          Add Todo
        </button>
      </div>

      <div style={{ border: "1px solid #eee", padding: "15px" }}>
        <h4 style={{ margin: "0 0 10px 0" }}>Todo List</h4>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {todos.map((todo, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span>{todo}</span>
              <button
                onClick={() => handleDeleteTodo(index)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  padding: "2px 8px",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
