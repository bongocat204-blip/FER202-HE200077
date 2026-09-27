import React, { useReducer } from "react";

// Khởi tạo state ban đầu
const initialState = { count: 0 };

// Hàm reducer xử lý các action
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

function CounterReducer() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div
      style={{
        textAlign: "center",
        margin: "20px",
        padding: "20px",
        border: "1px solid #ccc",
      }}
    >
      <h3>Bài 1: Counter Component (useReducer)</h3>
      <h2>Count: {state.count}</h2>
      <div>
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          style={{ margin: "0 5px", padding: "5px 15px" }}
        >
          +
        </button>
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          style={{ margin: "0 5px", padding: "5px 15px" }}
        >
          -
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          style={{ margin: "0 5px", padding: "5px 15px" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default CounterReducer;
