import React, { useState } from "react";

const EventHandlingDemo = () => {
  // Khai báo state count với giá trị ban đầu là 0
  const [count, setCount] = useState(0);

  // Hàm xử lý sự kiện khi bấm nút
  const handleButtonClick = () => {
    setCount(count + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Event Handling Demo</h1>
      <p>Count: {count}</p>
      <button onClick={handleButtonClick}>Increase Count</button>
    </div>
  );
};

export default EventHandlingDemo;
