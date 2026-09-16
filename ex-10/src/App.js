import React, { useState } from "react";

function App() {
  // 1. Dữ liệu thực đơn Five Star đặc trưng
  const menuList = [
    {
      id: 1,
      name: "Gà Giòn Truyền Thống",
      oldPrice: "35.000đ",
      newPrice: "30.000đ",
      image:
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60",
      tag: "BÁN CHẠY",
    },
    {
      id: 2,
      name: "Gà Giòn Cay Phô Mai",
      oldPrice: "40.000đ",
      newPrice: "34.000đ",
      image:
        "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500&auto=format&fit=crop&q=60",
      tag: "HOT",
    },
    {
      id: 3,
      name: "Xiên Que Lắc Phô Mai",
      oldPrice: "15.000đ",
      newPrice: "12.000đ",
      image:
        "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&auto=format&fit=crop&q=60",
      tag: "COMBO",
    },
    {
      id: 4,
      name: "Khoai Tây Chiên Lắc",
      oldPrice: "25.000đ",
      newPrice: "20.000đ",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZdDzOTbNKFWFVronrrABSOBQQP5nlMNMbJ_YbRg--1eSPboElueiSOxk&s=10",
      tag: "GIẢM GIÁ",
    },
  ];

  // 2. State quản lý form đặt giao hàng
  const [orderForm, setOrderForm] = useState({
    fullName: "",
    phone: "",
    combo: "Chọn combo...",
    note: "",
  });

  const handleInputChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    alert(
      `Cảm ơn bạn ${orderForm.fullName || "Khách hàng"}! Đơn hàng sẽ được giao đến bạn sớm nhất.`,
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#800000",
        color: "#ffffff",
        minHeight: "100vh",
      }}
      className="pb-5"
    >
      {/* ========================================================= */}
      {/* 1. HEADER / NAVBAR FIVE STAR                             */}
      {/* ========================================================= */}
      <nav
        className="navbar navbar-expand-lg px-4 border-bottom border-warning"
        style={{ backgroundColor: "#990000" }}
      >
        <div className="container-fluid">
          {/* Logo Brand Five Star */}
          <a
            className="navbar-brand d-flex flex-column text-decoration-none"
            href="#home"
          >
            <span
              className="fw-black fs-2 text-warning font-monospace"
              style={{ letterSpacing: "2px", fontWeight: "900" }}
            >
              ★ FIVE STAR ★
            </span>
            <small
              className="text-white fst-italic"
              style={{ fontSize: "11px" }}
            >
              GÀ RÁN GIÒN - XIÊN QUE NGON
            </small>
          </a>

          {/* Menu links & Search */}
          <div className="collapse navbar-collapse justify-content-end show">
            <ul className="navbar-nav mb-2 mb-lg-0 me-3">
              <li className="nav-item">
                <a
                  className="nav-link active text-warning fw-bold"
                  href="#menu"
                >
                  Thực Đơn
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#order">
                  Đặt Hàng
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#contact">
                  Hệ Thống Cửa Hàng
                </a>
              </li>
            </ul>

            <form className="d-flex">
              <input
                className="form-control form-control-sm me-2 bg-light text-dark border-0"
                type="search"
                placeholder="Tìm món gà, xiên que..."
                style={{ width: "180px" }}
              />
              <button
                className="btn btn-warning btn-sm fw-bold text-dark"
                type="button"
              >
                Tìm
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* 2. HERO BANNER FIVE STAR                                  */}
      {/* ========================================================= */}
      <div className="position-relative text-center overflow-hidden mb-5">
        <img
          src="https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=1600&auto=format&fit=crop&q=80"
          alt="Five Star Fried Chicken"
          className="img-fluid w-100"
          style={{
            maxHeight: "420px",
            objectFit: "cover",
            filter: "brightness(60%)",
          }}
        />
        <div className="position-absolute top-50 start-50 translate-middle text-white px-3 w-100">
          <h1
            className="display-4 fw-black text-warning text-uppercase"
            style={{ fontWeight: "900", textShadow: "2px 2px 8px #000" }}
          >
            Chicken Five Star
          </h1>
          <p className="fs-5 text-light fw-medium">
            The Best Fried Chicken in Town
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. MENU 4 CỘT CARDS                                       */}
      {/* ========================================================= */}
      <div className="container mb-5" id="menu">
        <div className="d-flex justify-content-between align-items-end mb-4 border-bottom border-warning pb-2">
          <h2 className="fw-bold text-warning mb-0">MÓN ĂN ĐƯỢC YÊU THÍCH</h2>
          <span className="text-light small">Gà tươi 100% mỗi ngày</span>
        </div>

        <div className="row g-4">
          {menuList.map((item) => (
            <div key={item.id} className="col-lg-3 col-md-6 col-12">
              <div
                className="card h-100 text-white border-2 border-warning position-relative rounded-3 overflow-hidden"
                style={{ backgroundColor: "#5c0000" }}
              >
                {/* Nhãn Tag khuyến mãi */}
                <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2 px-2 py-1 fw-bold">
                  {item.tag}
                </span>

                {/* Ảnh món ăn */}
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "180px", objectFit: "cover" }}
                />

                {/* Thân Card */}
                <div className="card-body d-flex flex-column text-center p-3">
                  <h5 className="card-title fw-bold text-white mb-2">
                    {item.name}
                  </h5>
                  <div className="mb-3">
                    <del className="text-light-50 me-2 small text-secondary">
                      {item.oldPrice}
                    </del>
                    <span className="fw-bold text-warning fs-5">
                      {item.newPrice}
                    </span>
                  </div>
                  <button className="btn btn-warning text-dark fw-bold w-100 mt-auto shadow-sm">
                    Chọn Mua
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. FORM ĐẶT GIAO HÀNG TẬN NƠI                             */}
      {/* ========================================================= */}
      <div className="container" style={{ maxWidth: "850px" }} id="order">
        <div
          className="p-4 rounded-4 shadow-lg"
          style={{ backgroundColor: "#6b0000", border: "1px solid #ffc107" }}
        >
          <h3 className="text-center fw-bold text-warning mb-2">
            ĐẶT GIAO TẬN NƠI
          </h3>
          <p className="text-center text-light small mb-4">
            Giao nóng giòn trong vòng 30 phút
          </p>

          <form onSubmit={handleOrderSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-md-4 col-12">
                <input
                  type="text"
                  className="form-control bg-light text-dark border-0"
                  placeholder="Họ và tên của bạn *"
                  name="fullName"
                  value={orderForm.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4 col-12">
                <input
                  type="tel"
                  className="form-control bg-light text-dark border-0"
                  placeholder="Số điện thoại nhận hàng *"
                  name="phone"
                  value={orderForm.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4 col-12">
                <select
                  className="form-select bg-light text-dark border-0"
                  name="combo"
                  value={orderForm.combo}
                  onChange={handleInputChange}
                >
                  <option value="Chọn combo...">Chọn combo ưu đãi *</option>
                  <option value="Combo 1">
                    Combo 1 Người (1 Đùi + Khoai + Nước)
                  </option>
                  <option value="Combo 2">
                    Combo Bạn Bè (3 Miếng Gà + 2 Xiên)
                  </option>
                  <option value="Combo Gia Đình">
                    Combo Gia Đình (5 Miếng + 2 Khoai)
                  </option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <textarea
                className="form-control bg-light text-dark border-0"
                rows="3"
                placeholder="Địa chỉ giao hàng chi tiết (Số nhà, ngõ, tên toà nhà...)"
                name="note"
                value={orderForm.note}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-warning px-5 py-2 fw-bold text-dark fs-5 shadow"
              >
                XÁC NHẬN ĐẶT HÀNG
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
