import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ktuat from "./khanhtuat.jpg";
// ==========================================
// 1. Component hiển thị tên và giới thiệu ngắn
// ==========================================
function AboutMe() {
  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h4 className="fw-bold">1. About Me Component</h4>
      <p className="mb-1">
        <strong>Tên:</strong> Nguyễn Đình Thế Anh
      </p>
      <p className="mb-0 text-muted">
        <strong>Giới thiệu:</strong>Tôi là một sinh viên trường đại học FPT,
        hiện đang học ngành Kỹ thuật phần mềm.
      </p>
    </div>
  );
}

// ==========================================
// 2. Component "Hello, World!"
// ==========================================
function HelloWorld() {
  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h4 className="fw-bold">2. Hello World Component</h4>
      <h5 className="text-success mb-0">Hello, World!</h5>
    </div>
  );
}

// ==========================================
// 3. Counter Application (Tăng / Giảm số)
// ==========================================
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h4 className="fw-bold">3. Counter Application</h4>
      <div className="d-flex align-items-center gap-3 mt-2">
        <button
          className="btn btn-danger px-3"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <span className="fs-4 fw-bold">{count}</span>
        <button
          className="btn btn-success px-3"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 4. Simple Card Architecture (Leaf components & Wrapper)
// ==========================================
function Title({ text }) {
  return <h4 className="text-warning mb-1 fw-bold">{text}</h4>;
}

function Description({ text }) {
  return <p className="text-muted mb-0">{text}</p>;
}

function Image({ url }) {
  return (
    <div
      className="bg-warning-subtle text-warning fw-bold d-flex align-items-center justify-content-center p-4 border-end"
      style={{ minWidth: "100px" }}
    >
      {url ? (
        <img src={url} alt="card" style={{ maxWidth: "80px" }} />
      ) : (
        <img src={ktuat} alt="card" style={{ maxWidth: "80px" }} />
      )}
    </div>
  );
}

function SimpleCard({ item }) {
  return (
    <div
      className="card p-0 mb-4 shadow-sm overflow-hidden"
      style={{ border: "2px solid #000" }}
    >
      <div className="d-flex align-items-stretch">
        <Image url={item.imageUrl} />
        <div className="p-3 w-100">
          <div className="border-bottom pb-2 mb-2">
            <Title text={item.title} />
          </div>
          <Description text={item.description} />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. Create Simple Website Layout
// ==========================================
function SimpleWebsite() {
  return (
    <div
      className="border rounded overflow-hidden mb-4 shadow-sm"
      style={{ backgroundColor: "#e28743" }}
    >
      {/* Header & Logo Banner */}
      <div className="text-center p-4">
        <div className="bg-white d-inline-block p-3 rounded shadow-sm">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ad/FPT_Education_logo.svg"
            alt="FPT University"
            style={{ height: "60px" }}
          />
        </div>
        <div className="mt-2 text-white fw-bold">
          <span className="mx-2">Home</span>
          <span className="mx-2">About</span>
          <span className="mx-2">Contact</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-5 text-center">
        <h3 className="fw-bold mb-2">About</h3>
        <p className="text-muted mb-5">
          This is the about section of the website.
        </p>

        <h3 className="fw-bold mb-2">Contact</h3>
        <p className="text-muted mb-0">
          For any inquiries, please contact us at{" "}
          <a href="mailto:example@example.com">example@example.com</a>.
        </p>
      </div>

      {/* Footer */}
      <div
        className="text-center py-3 text-white-50 small"
        style={{ backgroundColor: "#d47a37" }}
      >
        © 2023 Website. All rights reserved.
      </div>
    </div>
  );
}

// ==========================================
// MAIN EXERCISE 9 COMPONENT
// ==========================================
export default function Exercise9() {
  const cardData = {
    title: "Nguyễn Văn Khánh",
    description: "Ham ăn và ham chơi.",
    imageUrl: "",
  };

  return (
    <div className="container my-4" style={{ maxWidth: "800px" }}>
      <h2 className="mb-4 text-primary fw-bold">Exercise 9: React Component</h2>

      <AboutMe />
      <HelloWorld />
      <Counter />

      <h4 className="fw-bold mb-3">4. Create Simple Card</h4>
      <SimpleCard item={cardData} />

      <h4 className="fw-bold mb-3">5. Create Simple Website</h4>
      <SimpleWebsite />
    </div>
  );
}
