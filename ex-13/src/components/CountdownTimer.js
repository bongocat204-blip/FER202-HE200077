import React, { useState, useEffect } from "react";

function CountdownTimer({ initialValue = 10 }) {
  const [timeRemaining, setTimeRemaining] = useState(initialValue);

  useEffect(() => {
    if (timeRemaining <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [timeRemaining]);

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        textAlign: "center",
      }}
    >
      <h3>Bài 2: Countdown Timer</h3>
      <h2>
        {timeRemaining > 0 ? `Time Remaining: ${timeRemaining}` : "Time is up!"}
      </h2>
    </div>
  );
}

export default CountdownTimer;
