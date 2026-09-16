import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Exercise8() {
  const [formData, setFormData] = useState({
    hoTen: "",
    diaChi: "",
    diTu: "Hà nội",
    den: "Hà nội",
    chieuDi: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let updatedChieuDi = [...formData.chieuDi];
      if (checked) {
        updatedChieuDi.push(value);
      } else {
        updatedChieuDi = updatedChieuDi.filter((item) => item !== value);
      }
      setFormData({ ...formData, chieuDi: updatedChieuDi });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu đặt vé:", formData);
    alert("Đặt vé thành công!");
  };

  return (
    <div className="container my-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-primary fw-bold">
        Exercise 8: Demo about Form Control
      </h2>

      <div className="card shadow-sm border rounded">
        {/* Banner Alert phía trên có nút đóng x */}
        <div
          className="alert alert-warning alert-dismissible fade show mb-0 rounded-top"
          role="alert"
        >
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>

        <div className="card-body p-4">
          <h2 className="fw-bold mb-4">Form đặt vé máy bay</h2>

          <form onSubmit={handleSubmit}>
            {/* Họ tên */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Họ tên</label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted">👤</span>
                <input
                  type="text"
                  className="form-control"
                  name="hoTen"
                  placeholder="Họ tên"
                  value={formData.hoTen}
                  onChange={handleChange}
                />
                <span className="input-group-text bg-light text-muted">
                  vnđ
                </span>
              </div>
              <div className="form-text text-muted small">
                Phải nhập 5 ký tự, in hoa...
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                name="diaChi"
                value={formData.diaChi}
                onChange={handleChange}
              />
              <div className="form-text text-muted small">
                Phải nhập 5 ký tự, in hoa...
              </div>
            </div>

            {/* Đi từ & Đến */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Đi từ</label>
                <select
                  className="form-select"
                  name="diTu"
                  value={formData.diTu}
                  onChange={handleChange}
                >
                  <option value="Hà nội">Hà nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Đến</label>
                <select
                  className="form-select"
                  name="den"
                  value={formData.den}
                  onChange={handleChange}
                >
                  <option value="Hà nội">Hà nội</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                </select>
              </div>
            </div>

            {/* Chọn chiều đi (Khứ hồi) */}
            <div className="mb-4">
              <label className="form-label fw-semibold d-block">
                Chọn chiều đi (Khứ hồi)
              </label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="chieuDi"
                  name="chieuDi"
                  value="Đi"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="chieuDi">
                  Đi
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="chieuVe"
                  name="chieuDi"
                  value="Về"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="chieuVe">
                  Về
                </label>
              </div>
            </div>

            {/* Nút Đặt vé */}
            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold py-2"
            >
              Đặt vé
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Exercise8;
