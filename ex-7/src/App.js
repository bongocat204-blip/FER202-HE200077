import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import car from "./toyota.jpg";
function Exercise7() {
  return (
    <div className="container my-4">
      <h2 className="mb-3 text-primary fw-bold">
        Exercise 7: Demo about Cards Column
      </h2>

      <div className="card border">
        <div className="card-header fs-4 bg-light fw-bold p-3">
          Cards Columns
        </div>
        <div className="card-body p-4">
          <div className="row g-4">
            {/* Card 1: Khung xanh dương (Blue) */}
            <div className="col-12 col-md-4">
              <div
                className="card text-center text-white border-0"
                style={{ backgroundColor: "#0d6efd" }}
              >
                <div className="p-3">
                  <img
                    src={car}
                    className="card-img-top rounded bg-white p-1"
                    alt="Toyota Corolla Cross"
                    style={{ height: "180px", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body pt-0 pb-3">
                  <small className="card-text opacity-90">
                    Some text inside the first card
                  </small>
                </div>
              </div>
            </div>

            {/* Card 2: Khung vàng (Yellow) */}
            <div className="col-12 col-md-4">
              <div
                className="card text-center text-dark border-0"
                style={{ backgroundColor: "#ffc107" }}
              >
                <div className="p-3">
                  <img
                    src={car}
                    className="card-img-top rounded bg-white p-1"
                    alt="Toyota Corolla Cross"
                    style={{ height: "180px", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body pt-0 pb-3">
                  <small className="card-text opacity-90">
                    Some text inside the first card
                  </small>
                </div>
              </div>
            </div>

            {/* Card 3: Khung đỏ (Red) */}
            <div className="col-12 col-md-4">
              <div
                className="card text-center text-white border-0"
                style={{ backgroundColor: "#dc3545" }}
              >
                <div className="p-3">
                  <img
                    src={car}
                    className="card-img-top rounded bg-white p-1"
                    alt="Toyota Corolla Cross"
                    style={{ height: "180px", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body pt-0 pb-3">
                  <small className="card-text opacity-90">
                    Some text inside the first card
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exercise7;
