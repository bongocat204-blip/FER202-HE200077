import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className="not-found-container"
      style={{ textAlign: "center", padding: "30px 0" }}
    >
      <h2>404 - Not Found</h2>
      <p style={{ margin: "10px 0" }}>Trang bạn truy cập không tồn tại.</p>
      <button onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        [Ve trang chu]
      </button>
    </div>
  );
}
