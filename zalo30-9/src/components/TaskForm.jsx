import React, { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask(title.trim());
    setTitle("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nhập tên công việc........"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Thêm</button>
    </form>
  );
}