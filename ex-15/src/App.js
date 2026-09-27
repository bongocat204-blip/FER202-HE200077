import React from "react";
import CounterReducer from "./components/CounterReducer";
import QuestionBank from "./components/QuestionBank";

function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Exercise 15: React Hook (useReducer)
      </h1>
      <CounterReducer />
      <QuestionBank />
    </div>
  );
}

export default App;
