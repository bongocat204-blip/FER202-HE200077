import React, { useState, useEffect } from "react";

function ValidatedInput({ validationFunction, errorMessage }) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    // Nếu ô input trống thì có thể bỏ qua hoặc kiểm tra tùy theo logic
    if (value === "") {
      setIsValid(true);
      return;
    }
    setIsValid(validationFunction(value));
  }, [value, validationFunction]);

  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}>
      <h3>Bài 4: Form Input Validation</h3>
      <div
        style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Nhập dữ liệu..."
          style={{
            padding: "8px",
            borderColor: isValid ? "#ccc" : "red",
            outline: "none",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "4px",
          }}
        />
        {!isValid && (
          <span style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
}

export default ValidatedInput;
