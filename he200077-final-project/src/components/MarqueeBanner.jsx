import React from 'react';

const MarqueeBanner = () => {
  return (
    <div className="top-ticker py-1">
      <div className="container-fluid px-3 d-flex align-items-center">
        <span className="badge me-3 px-2 py-1 text-black fw-bold" style={{ backgroundColor: '#00FF87', fontSize: '0.75rem' }}>
          <i className="bi bi-broadcast me-1"></i> THÔNG BÁO
        </span>
        <div className="ticker-wrap flex-grow-1">
          <div className="ticker-content text-uppercase fw-semibold">
            <span className="mx-4 text-neon">
              <i className="bi bi-shield-check me-1"></i> BẢO HÀNH TRỌN ĐỜI 100% MỌI TÀI KHOẢN
            </span>
            <span className="mx-4 text-white">
              <i className="bi bi-lightning-charge-fill text-warning me-1"></i> GIAO DỊCH TỰ ĐỘNG 24/7 - NHẬN TÀI KHOẢN TRONG 30 GIÂY
            </span>
            <span className="mx-4 text-neon-cyan">
              <i className="bi bi-gift-fill me-1"></i> KHUYẾN MÃI NẠP: TẶNG +20% GIÁ TRỊ THẺ NẠP ĐẦU TIÊN
            </span>
            <span className="mx-4 text-warning">
              <i className="bi bi-controller me-1"></i> HƠN 60+ NICK VIP MỚI CẬP NHẬT LIÊN QUÂN, LOL, TFT, DELTA FORCE
            </span>
            <span className="mx-4 text-light">
              <i className="bi bi-telephone-fill text-danger me-1"></i> HOTLINE / ZALO HỖ TRỢ 24/7: 0988.777.999
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeBanner;
