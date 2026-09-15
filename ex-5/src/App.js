import React from "react";
import fptLogo from "./fpt-logo.png";
import svfpt from "./svfpt.jpg";
import svfpt1 from "./svfpt1.jpg";

function App() {
  const students = [
    {
      id: "DE160182",
      name: "Nguyễn Hữu Quốc Khánh",
      location: "DaNang",
      img: svfpt1,
    },
    {
      id: "DE160077",
      name: "Châu Vinh Thiện",
      location: "QuangNam",
      img: svfpt1,
    },
    {
      id: "DE160547",
      name: "Đỗ Nguyên Phúc",
      location: "QuangNam",
      img: svfpt1,
    },
    {
      id: "DE170049",
      name: "Lê Hoàng Minh",
      location: "DaNang",
      img: svfpt1,
    },
  ];

  return (
    <div className="container my-5">
      {/* ===== BÀI 1: Grid System Basic ===== */}
      <h2 className="mb-3 text-primary">1. Test Grid Layout</h2>
      <div className="card mb-5">
        <div className="card-header fs-3 bg-light p-4">
          Let's test the grid!
        </div>
        <div className="card-body">
          <div className="row text-center g-0 mb-2 border">
            <div className="col-6 p-3 bg-light border-end">First col</div>
            <div className="col-6 p-3 bg-light">Second col</div>
          </div>
          <div className="row text-center g-0 mb-2 border">
            <div className="col-4 p-3 bg-light border-end">col</div>
            <div className="col-4 p-3 bg-light border-end">col</div>
            <div className="col-4 p-3 bg-light">col</div>
          </div>
          <div className="row text-center g-0 border">
            <div className="col-3 p-3 bg-light border-end">col</div>
            <div className="col-3 p-3 bg-light border-end">col</div>
            <div className="col-3 p-3 bg-light border-end">col</div>
            <div className="col-3 p-3 bg-light">col</div>
          </div>
        </div>
        <div className="card-footer text-center fs-4 bg-secondary text-white p-3">
          Created by ABC!
        </div>
      </div>

      {/* ===== BÀI 2: Display Images ===== */}
      <h2 className="mb-3 text-primary">2. My First Bootstrap Page</h2>
      <div className="card text-center mb-5">
        <div className="card-header fs-2 bg-light p-4">
          My First Bootstrap Page
        </div>
        <div className="card-body p-5">
          <div className="row justify-content-center align-items-center g-4">
            <div className="col-md-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
                className="img-fluid"
                style={{ maxHeight: "150px" }}
                alt="HTML5"
              />
            </div>
            <div className="col-md-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"
                className="img-fluid"
                style={{ maxHeight: "150px" }}
                alt="CSS3"
              />
            </div>
            <div className="col-md-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg"
                className="img-fluid"
                style={{ maxHeight: "150px" }}
                alt="Bootstrap"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== BÀI 3: Grid với Nav Tabs ===== */}
      <h2 className="mb-3 text-primary">3. Grid with Navigation</h2>
      <div className="card mb-5">
        <div className="card-header fs-3 bg-light p-4">
          Let's test the grid!
        </div>
        <div className="card-body">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <a className="nav-link active" href="#active">
                Active
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#link1">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#link2">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#disabled"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>

          <div className="row text-center g-0 mb-2 border">
            <div className="col-6 p-3 bg-light border-end">First col</div>
            <div className="col-6 p-3 bg-light">Second col</div>
          </div>
          <div className="row text-center g-0 mb-2 border">
            <div className="col-4 p-3 bg-light border-end">col</div>
            <div className="col-4 p-3 bg-light border-end">col</div>
            <div className="col-4 p-3 bg-light">col</div>
          </div>
          <div className="row text-center g-0 border">
            <div className="col-3 p-3 bg-light border-end">col</div>
            <div className="col-3 p-3 bg-light border-end">col</div>
            <div className="col-3 p-3 bg-light border-end">col</div>
            <div className="col-3 p-3 bg-light">col</div>
          </div>
        </div>
        <div className="card-footer text-center fs-4 bg-secondary text-white p-3">
          Created by ABC!
        </div>
      </div>

      {/* ===== BÀI 4: FPT Landing Page Simple ===== */}
      <h2 className="mb-3 text-primary">4. Simple Landing Page</h2>
      <div
        className="border mb-5 overflow-hidden shadow-sm"
        style={{ borderRadius: "4px" }}
      >
        {/* Header màu cam FPT */}
        <div
          className="text-center p-4 text-white"
          style={{ backgroundColor: "#e07b24" }}
        >
          <div className="bg-white d-inline-block p-3 rounded mb-3 shadow-sm">
            <img
              src={fptLogo}
              alt="FPT Education"
              style={{ maxHeight: "90px" }}
            />
          </div>
          <div className="mt-2">
            <a
              href="#home"
              className="text-white text-decoration-none mx-2 fw-semibold"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white text-decoration-none mx-2 fw-semibold"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-white text-decoration-none mx-2 fw-semibold"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Nội dung trang */}
        <div className="bg-white py-5 text-center">
          <h4 className="fw-bold text-dark">About</h4>
          <p className="text-secondary small">
            This is the about section of the website.
          </p>

          <h4 className="fw-bold text-dark mt-4">Contact</h4>
          <p className="text-secondary small">
            For any inquiries, please contact us at{" "}
            <a
              href="mailto:example@example.com"
              className="text-decoration-none text-secondary"
            >
              example@example.com
            </a>
            .
          </p>
        </div>

        {/* Footer màu cam nhạt */}
        <div
          className="text-center py-3 text-dark small"
          style={{ backgroundColor: "#fcd393" }}
        >
          &copy; 2026 Website. All rights reserved.
        </div>
      </div>

      {/* ===== BÀI 5: Students Detail Page ===== */}
      <h2 className="mb-3 text-primary">5. Students Detail Page</h2>
      <div
        className="border mb-5 overflow-hidden shadow-sm"
        style={{ borderRadius: "4px" }}
      >
        {/* Main Banner Box */}
        <div className="p-3 text-center" style={{ backgroundColor: "#e07b24" }}>
          {/* Top Navbar Header */}
          <div className="d-flex justify-content-between align-items-center mb-3 px-2">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-white text-dark p-1 fs-6">
                <img src={fptLogo} alt="Logo" style={{ height: "20px" }} />
              </span>
              <div className="text-white text-start">
                <span
                  className="d-block fw-bold"
                  style={{ fontSize: "11px", lineHeight: "1.1" }}
                >
                  Trang chủ | Ngành học | Tuyển sinh | Sinh viên
                </span>
              </div>
            </div>
            <div>
              <span className="text-white me-2 small">Search:</span>
              <input
                type="text"
                className="form-control form-control-sm d-inline-block"
                style={{ width: "150px", height: "24px" }}
              />
            </div>
          </div>

          {/* Banner Image */}
          <img
            src={svfpt}
            className="img-fluid rounded border border-white border-2"
            alt="FPT Students"
            style={{ maxHeight: "350px", width: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Content Section */}
        <div className="bg-white p-4">
          <p className="text-muted small mb-4">Home / Students</p>
          <h4 className="text-center fw-bold mb-4">Students Detail</h4>

          <div className="row g-4">
            {students.map((st, idx) => (
              <div key={idx} className="col-md-6">
                <div className="card h-100 border text-center p-2 shadow-sm">
                  <img
                    src={st.img}
                    className="card-img-top mx-auto"
                    alt={st.name}
                    style={{ height: "240px", objectFit: "cover" }}
                  />
                  <div className="card-body p-2">
                    <small className="text-muted d-block fw-semibold">
                      {st.id}
                    </small>
                    <div className="d-flex justify-content-between align-items-center mt-2 px-1 small">
                      <span className="fw-bold">{st.name}</span>
                      <span className="text-muted">{st.location}</span>
                    </div>
                    <div className="mt-3 d-flex justify-content-around small">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name={`st-${idx}`}
                          className="me-1"
                        />{" "}
                        Absent
                      </label>
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name={`st-${idx}`}
                          className="me-1"
                        />{" "}
                        Present
                      </label>
                    </div>
                    <button
                      className="btn btn-sm text-white mt-3 px-4"
                      style={{ backgroundColor: "#e07b24" }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer
          className="p-4 text-dark"
          style={{ backgroundColor: "#e07b24" }}
        >
          <div className="row small text-white">
            <div className="col-md-6">
              <h6 className="fw-bold text-dark">Our Address</h6>
              <p className="mb-1">Khu đô thị FPT Đà Nẵng</p>
              <p className="mb-1">📞 +84236 7300 999</p>
              <p className="mb-1">📱 +84236 7300 888</p>
              <p className="mb-0">✉️ dn@fpt.edu.vn</p>
            </div>
          </div>
          <div className="text-center mt-3 pt-2 border-top border-white-50 small text-white-50">
            &copy; Copyright 2026
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
