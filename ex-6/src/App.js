import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Exercise6() {
  return (
    <div className="container my-4">
      <h2 className="mb-3 text-primary fw-bold">
        Exercise 6: Build website layout using Bootstrap Grid
      </h2>

      <div className="border overflow-hidden shadow-sm bg-white rounded">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom px-3">
          <div className="container-fluid">
            <a className="navbar-brand text-muted" href="#home">
              Navbar
            </a>
            <div className="d-flex me-auto">
              <a className="nav-link text-muted me-3" href="#home">
                Home
              </a>
              <a className="nav-link text-muted me-3" href="#link">
                Link
              </a>
              <a className="nav-link text-muted" href="#dropdown">
                Dropdown
              </a>
            </div>
            <form className="d-flex">
              <input
                className="form-control form-control-sm me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-primary btn-sm" type="button">
                Search
              </button>
            </form>
          </div>
        </nav>

        {/* Hero / Carousel Banner */}
        <div
          className="bg-secondary text-white d-flex align-items-center justify-content-between px-4 position-relative"
          style={{ height: "300px" }}
        >
          <button className="btn text-white fs-3 opacity-75">&lt;</button>
          <div className="fs-1 fw-bold text-light opacity-75">1920 x 530</div>
          <button className="btn text-white fs-3 opacity-75">&gt;</button>

          {/* Carousel Indicators */}
          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-1">
            <span
              className="bg-white rounded opacity-75"
              style={{ width: "20px", height: "3px" }}
            ></span>
            <span
              className="bg-white rounded opacity-50"
              style={{ width: "20px", height: "3px" }}
            ></span>
            <span
              className="bg-white rounded opacity-50"
              style={{ width: "20px", height: "3px" }}
            ></span>
          </div>
        </div>

        {/* Product List Section */}
        <div className="p-4">
          <h4 className="fw-bold mb-0">NEW PRODUCT</h4>
          <p className="text-muted small mb-4">List product description</p>

          <div className="row g-4">
            {[1, 2, 3, 4].map((item, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-md-3">
                <div className="card h-100 border text-center position-relative shadow-sm overflow-hidden">
                  {/* Badge "Sale" ở thẻ cuối cùng */}
                  {idx === 3 && (
                    <span
                      className="position-absolute bg-warning text-white fw-bold text-center"
                      style={{
                        top: "12px",
                        right: "-25px",
                        width: "90px",
                        fontSize: "10px",
                        transform: "rotate(45deg)",
                        zIndex: 1,
                        padding: "2px 0",
                      }}
                    >
                      Sale
                    </span>
                  )}

                  {/* Placeholder hình ảnh */}
                  <div
                    className="bg-secondary text-white d-flex align-items-center justify-content-center"
                    style={{ height: "180px" }}
                  >
                    <span className="fs-6 opacity-75">280 x 280</span>
                  </div>

                  {/* Chi tiết sản phẩm */}
                  <div className="card-body p-2 text-start">
                    <div className="fw-semibold text-muted small">Product</div>
                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <small
                        className="text-decoration-line-through text-muted"
                        style={{ fontSize: "11px" }}
                      >
                        100.000 vnd
                      </small>
                      <small
                        className="text-warning fw-bold"
                        style={{ fontSize: "11px" }}
                      >
                        80.000 vnd
                      </small>
                    </div>

                    <button className="btn btn-sm btn-outline-secondary mt-2 w-100 d-flex align-items-center justify-content-center gap-1 p-1">
                      <span style={{ fontSize: "11px" }}>🛒 Xem chi tiết</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exercise6;
