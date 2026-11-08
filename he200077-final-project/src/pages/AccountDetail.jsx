import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CheckoutModal from '../components/CheckoutModal';
import {
  getAccountById,
  formatVND,
  normalizeGameKey,
  GAME_METADATA,
  BANK_INFO
} from '../services/api';

const AccountDetail = () => {
  const { gameCode, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const gameKey = normalizeGameKey(gameCode);
  const meta = GAME_METADATA[gameKey] || GAME_METADATA.g_lol;

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Checkout modal
  const [openCheckout, setOpenCheckout] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAccountById(gameKey, id);
        if (!data || !data.id) {
          throw new Error('Tài khoản không tồn tại hoặc đã bị xóa.');
        }
        setAccount(data);
      } catch (err) {
        console.error('Error fetching account detail:', err);
        setError(err.message || 'Không thể tải chi tiết tài khoản.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [gameKey, id]);

  const handleInitiateBuy = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    setOpenCheckout(true);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-neon mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-secondary font-tactical">ĐANG TẢI DỮ LIỆU TÀI KHOẢN #{id}...</p>
      </div>
    );
  }

  if (error || !account) {
    return (
      <div className="container py-5 text-center">
        <div className="card card-tactical max-w-500 mx-auto p-5 border-danger">
          <i className="bi bi-exclamation-octagon-fill text-danger fs-1 mb-3"></i>
          <h3 className="text-white fw-bold mb-2">KHÔNG TÌM THẤY TÀI KHOẢN</h3>
          <p className="text-secondary mb-4">{error || 'Tài khoản không tồn tại.'}</p>
          <Link to={`/Home/${gameKey}`} className="btn btn-tactical">
            <i className="bi bi-arrow-left me-2"></i> Quay Lại Danh Mục {meta.code}
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = account.status === 'Available';

  return (
    <div className="account-detail-page py-4">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/Home" className="text-secondary text-decoration-none">
                Trang Chủ
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/Home/${gameKey}`} className="text-secondary text-decoration-none">
                {meta.code}
              </Link>
            </li>
            <li className="breadcrumb-item active text-neon" aria-current="page">
              #{account.id}
            </li>
          </ol>
        </nav>

        {/* MAIN ACCOUNT DETAIL VIEW */}
        <div className="row g-4">
          {/* Left Column: Account Details & Specs */}
          <div className="col-12 col-lg-8">
            <div className="card card-tactical p-4 mb-4">
              {/* Badges Bar */}
              <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                <span className="badge badge-game fs-6">{meta.code}</span>
                <span className="badge-rank fs-6">
                  <i className="bi bi-shield-fill me-1"></i> {account.rank}
                </span>
                <span className={`badge-status ${isAvailable ? 'available' : 'sold'} fs-6`}>
                  {isAvailable ? 'SẴN SÀNG GIAO DỊCH' : 'ĐÃ BÁN'}
                </span>
                <span className="text-secondary small font-monospace ms-auto">MÃ SỐ: #{account.id}</span>
              </div>

              <h2 className="text-white fw-bold mb-3 font-heading">{account.title}</h2>

              {/* Price Banner */}
              <div
                className="p-3 rounded mb-4 d-flex align-items-center justify-content-between"
                style={{ backgroundColor: '#0e1624', border: '1px solid rgba(0, 255, 135, 0.2)' }}
              >
                <div>
                  <div className="small text-secondary font-tactical">GIÁ BÁN NIÊM YẾT</div>
                  <div className="fs-1 fw-bolder text-neon">{formatVND(account.price)}</div>
                </div>
                <div className="text-end">
                  <div className="small text-secondary font-tactical">PHƯƠNG THỨC THANH TOÁN</div>
                  <div className="fs-5 fw-bold text-warning">
                    <i className="bi bi-qr-code me-1"></i> Quét Mã TPBank QR
                  </div>
                </div>
              </div>

              {/* Specification Grid */}
              <h5 className="text-neon fw-bold font-tactical mb-3">
                <i className="bi bi-cpu me-2"></i> THÔNG SỐ CHI TIẾT TÀI KHOẢN
              </h5>

              <div className="row g-3 mb-4">
                <div className="col-6 col-md-3">
                  <div className="p-3 rounded bg-dark border border-secondary border-opacity-25 text-center">
                    <div className="small text-secondary mb-1">Thứ Hạng (Rank)</div>
                    <div className="fw-bold text-warning fs-5">{account.rank}</div>
                  </div>
                </div>

                {account.skinsCount !== undefined && (
                  <div className="col-6 col-md-3">
                    <div className="p-3 rounded bg-dark border border-secondary border-opacity-25 text-center">
                      <div className="small text-secondary mb-1">Trang Phục (Skins)</div>
                      <div className="fw-bold text-neon fs-5">{account.skinsCount}</div>
                    </div>
                  </div>
                )}

                {account.championsCount !== undefined && (
                  <div className="col-6 col-md-3">
                    <div className="p-3 rounded bg-dark border border-secondary border-opacity-25 text-center">
                      <div className="small text-secondary mb-1">Tướng (Champions)</div>
                      <div className="fw-bold text-info fs-5">{account.championsCount}</div>
                    </div>
                  </div>
                )}

                {account.chibiCount !== undefined && (
                  <div className="col-6 col-md-3">
                    <div className="p-3 rounded bg-dark border border-secondary border-opacity-25 text-center">
                      <div className="small text-secondary mb-1">Linh Thú Chibi</div>
                      <div className="fw-bold text-warning fs-5">{account.chibiCount}</div>
                    </div>
                  </div>
                )}

                <div className="col-6 col-md-3">
                  <div className="p-3 rounded bg-dark border border-secondary border-opacity-25 text-center">
                    <div className="small text-secondary mb-1">Tình Trạng Thông Tin</div>
                    <div className="fw-bold text-success fs-6">Chính Chủ - Trắng TT</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <h5 className="text-neon fw-bold font-tactical mb-2">
                <i className="bi bi-card-text me-2"></i> MÔ TẢ TỪ QUẢN TRỊ VIÊN
              </h5>
              <div className="p-3 rounded bg-dark bg-opacity-75 border border-secondary border-opacity-25 text-light mb-4">
                <p className="mb-0" style={{ lineHeight: '1.7' }}>
                  {account.description || 'Tài khoản uy tín, thông tin chính chủ, hỗ trợ đổi bảo mật và bảo hành vĩnh viễn.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-3 pt-3 border-top border-secondary border-opacity-25">
                {isAvailable ? (
                  <button
                    onClick={handleInitiateBuy}
                    className="btn btn-lg btn-tactical w-100 py-3"
                  >
                    <i className="bi bi-cart-check-fill me-2 fs-5"></i> MUA NGAY QUA MÃ QR TPBANK ({formatVND(account.price)})
                  </button>
                ) : (
                  <div className="alert alert-secondary w-100 text-center mb-0">
                    <i className="bi bi-info-circle-fill me-2"></i>
                    Tài khoản này đã được bán. Vui lòng tham khảo các tài khoản khác cùng danh mục!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Tactical Security Guarantee & Support */}
          <div className="col-12 col-lg-4">
            <div className="card card-tactical p-4 mb-4">
              <h5 className="text-white fw-bold font-heading mb-3 text-neon">
                <i className="bi bi-shield-check me-2"></i> QUY TRÌNH DUYỆT ĐƠN TPBANK
              </h5>

              <ul className="list-unstyled d-flex flex-column gap-3 small text-secondary mb-4">
                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-1-circle-fill text-neon mt-1 fs-5"></i>
                  <div>
                    <strong className="text-white">Bấm "Mua Ngay":</strong>
                    <div>Hệ thống tạo mã đơn hàng và mở mã QR ngân hàng TPBank.</div>
                  </div>
                </li>

                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-2-circle-fill text-warning mt-1 fs-5"></i>
                  <div>
                    <strong className="text-white">Quét QR & Chuyển Khoản:</strong>
                    <div>Quét mã QR với nội dung cú pháp hiển thị sẵn trên màn hình.</div>
                  </div>
                </li>

                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-3-circle-fill text-info mt-1 fs-5"></i>
                  <div>
                    <strong className="text-white">Admin Kiểm Tra & Duyệt:</strong>
                    <div>Đơn ở trạng thái <code>Pending</code>; Admin xác nhận và duyệt đơn trong 1-5 phút.</div>
                  </div>
                </li>

                <li className="d-flex align-items-start gap-2">
                  <i className="bi bi-4-circle-fill text-success mt-1 fs-5"></i>
                  <div>
                    <strong className="text-white">Nhận Tài Khoản & Mật Khẩu:</strong>
                    <div>Sau khi duyệt, thông tin đăng nhập lập tức mở khóa trong mục <strong>History</strong>.</div>
                  </div>
                </li>
              </ul>

              <div className="p-3 rounded border border-secondary border-opacity-25 bg-dark">
                <div className="small text-secondary mb-1">Tài khoản thụ hưởng chính thức:</div>
                <div className="fw-bold text-white">{BANK_INFO.bankName} - {BANK_INFO.accountHolder}</div>
                <div className="text-neon fw-bold font-monospace fs-6">{BANK_INFO.accountNumber}</div>
              </div>
            </div>
          </div>
        </div>

        {/* CHECKOUT MODAL WITH TPBANK QR */}
        {openCheckout && (
          <CheckoutModal
            account={account}
            gameCode={meta.code}
            onClose={() => setOpenCheckout(false)}
            onSuccess={() => {
              // Refresh account status or state
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AccountDetail;
