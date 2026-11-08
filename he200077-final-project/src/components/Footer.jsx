import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto border-top border-secondary border-opacity-25" style={{ backgroundColor: '#080C13' }}>
      <div className="container py-5">
        <div className="row g-4">
          {/* Brand Info */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="brand-badge">
                <i className="bi bi-crosshair text-neon"></i>
                <span>TACTICAL</span>
              </div>
              <span className="fw-bolder fs-4 text-white">
                BonggoShop<span className="text-neon">.skin</span>
              </span>
            </div>
            <p className="text-secondary small mb-3">
              Hệ thống mua bán tài khoản game hàng đầu Việt Nam. Tự động hóa 100%, bảo mật tuyệt đối, thanh toán tiện lợi qua TPBank QR với đội ngũ duyệt đơn 24/7.
            </p>
            <div className="d-flex gap-2">
              <span className="badge bg-dark border border-secondary text-light px-2 py-1">
                <i className="bi bi-shield-check text-neon me-1"></i> SSL 256-Bit
              </span>
              <span className="badge bg-dark border border-secondary text-light px-2 py-1">
                <i className="bi bi-patch-check-fill text-warning me-1"></i> Uy Tín 100%
              </span>
              <span className="badge bg-dark border border-secondary text-light px-2 py-1">
                <i className="bi bi-lightning-charge-fill text-info me-1"></i> Tự Động 24/7
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-2">
            <h6 className="text-white fw-bold font-heading mb-3 text-neon">Danh Mục Game</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li>
                <Link to="/Home/g_lol" className="text-secondary text-decoration-none hover-neon">
                  League of Legends (45 Acc)
                </Link>
              </li>
              <li>
                <Link to="/Home/g_tft" className="text-secondary text-decoration-none hover-neon">
                  Đấu Trường Chân Lý (30 Acc)
                </Link>
              </li>
              <li>
                <Link to="/Home/g_delta" className="text-secondary text-decoration-none hover-neon">
                  Delta Force Tactical (35 Acc)
                </Link>
              </li>
              <li>
                <Link to="/Home/g_lq" className="text-secondary text-decoration-none hover-neon">
                  Liên Quân Mobile (25 Acc)
                </Link>
              </li>
              <li>
                <Link to="/random" className="text-secondary text-decoration-none hover-neon">
                  Vòng Quay Random Acc
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div className="col-6 col-md-3">
            <h6 className="text-white fw-bold font-heading mb-3 text-neon">Chính Sách & Hỗ Trợ</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-secondary">
              <li>
                <i className="bi bi-check2-circle text-neon me-2"></i>Quy định bảo hành đổi trả
              </li>
              <li>
                <i className="bi bi-check2-circle text-neon me-2"></i>Hướng dẫn đổi mật khẩu an toàn
              </li>
              <li>
                <i className="bi bi-check2-circle text-neon me-2"></i>Hướng dẫn thanh toán quét mã QR TPBank
              </li>
              <li>
                <i className="bi bi-check2-circle text-neon me-2"></i>Quy trình Admin phê duyệt đơn hàng
              </li>
              <li>
                <i className="bi bi-check2-circle text-neon me-2"></i>Điều khoản bảo mật người dùng
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="col-12 col-md-3">
            <h6 className="text-white fw-bold font-heading mb-3 text-neon">Liên Hệ Hotline</h6>
            <div className="p-3 rounded border border-secondary border-opacity-25 bg-dark bg-opacity-50">
              <div className="d-flex align-items-center gap-2 mb-2 text-white">
                <i className="bi bi-telephone-fill text-neon"></i>
                <span className="fw-bold">0988.777.999</span>
                <span className="badge bg-success ms-auto">Online</span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2 text-secondary small">
                <i className="bi bi-envelope-fill text-info"></i>
                <span>hotro@bonggoshop.skin</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-secondary small">
                <i className="bi bi-clock-fill text-warning"></i>
                <span>Phục vụ 24/7/365</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-top border-secondary border-opacity-25 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
          <div>
            © {new Date().getFullYear()} <span className="text-white fw-semibold">BonggoShop.skin</span>. All Rights Reserved. Dark Tactical UI Edition.
          </div>
          <div className="d-flex gap-3">
            <span className="text-tactical-muted">Designed for Competitive Gamers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
