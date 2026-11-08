import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatVND, BANK_INFO, createTransaction } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CheckoutModal = ({ account, gameCode, onClose, onSuccess }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [successTx, setSuccessTx] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  if (!account) return null;

  const orderId = `tx_${Date.now()}`;
  const transferContent = `BONGGO ${user?.username || 'GUEST'} ${account.id}`;

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmPayment = async () => {
    if (!user) {
      alert('Vui lòng đăng nhập để thanh toán mua tài khoản!');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const newTx = {
        id: orderId,
        userId: user.id,
        username: user.username,
        accountId: account.id,
        gameCode: gameCode || 'LOL',
        accountTitle: account.title,
        price: Number(account.price) || 0,
        status: 'Pending',
        createdAt: new Date().toISOString().split('T')[0],
        paymentMethod: 'TPBank QR Transfer',
        transferNote: transferContent,
        accountDetails: account.accountDetails || {
          loginUsername: `${(gameCode || 'acc').toLowerCase()}_${account.id}`,
          loginPassword: `pass_${account.id}`
        }
      };

      const result = await createTransaction(newTx);
      setSuccessTx(result || newTx);
      if (onSuccess) onSuccess(result || newTx);
    } catch (err) {
      console.error('Failed to create pending order:', err);
      alert('Có lỗi khi tạo đơn hàng: ' + (err.message || 'Lỗi kết nối máy chủ'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1060 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content modal-content-tactical">
          <div className="modal-header modal-header-tactical">
            <h5 className="modal-title text-neon fw-bold font-heading">
              <i className="bi bi-qr-code-scan me-2"></i> THANH TOÁN MUA TÀI KHOẢN (QR BANK)
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              disabled={loading}
            ></button>
          </div>

          <div className="modal-body p-4">
            {successTx ? (
              /* Success confirmation state */
              <div className="text-center py-3">
                <div
                  className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'rgba(255, 184, 0, 0.15)',
                    border: '2px solid #FFB800',
                    color: '#FFB800'
                  }}
                >
                  <i className="bi bi-hourglass-split fs-1"></i>
                </div>
                <h3 className="text-warning fw-bold font-heading mb-2">ĐƠN HÀNG ĐANG CHỜ DUYỆT (PENDING)</h3>
                <p className="text-light mb-3 max-w-600 mx-auto">
                  Đơn hàng <strong>#{successTx.id}</strong> cho tài khoản <strong>{successTx.accountTitle}</strong> đã được ghi nhận.
                </p>

                <div className="p-3 rounded bg-dark border border-secondary border-opacity-50 text-start max-w-500 mx-auto mb-4 small">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary">Mã đơn hàng:</span>
                    <strong className="text-white font-monospace">{successTx.id}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary">Số tiền thanh toán:</span>
                    <strong className="text-neon fs-6">{formatVND(successTx.price)}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary">Trạng thái:</span>
                    <span className="badge bg-warning text-dark fw-bold">CHỜ DUYỆT (PENDING)</span>
                  </div>
                  <div className="d-flex justify-content-between border-top border-secondary pt-2">
                    <span className="text-secondary">Quy trình:</span>
                    <span className="text-neon-cyan">Admin sẽ kiểm tra TPBank và duyệt trong 1-5 phút</span>
                  </div>
                </div>

                <div className="alert alert-secondary bg-opacity-25 small mb-4">
                  <i className="bi bi-info-circle-fill text-info me-1"></i>
                  Ngay sau khi Quản trị viên duyệt đơn, tài khoản & mật khẩu sẽ lập tức hiển thị trong mục <strong>Lịch Sử Mua Hàng</strong> của bạn.
                </div>

                <div className="d-flex justify-content-center gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/history');
                    }}
                    className="btn btn-tactical px-4"
                  >
                    <i className="bi bi-clock-history me-1"></i> Xem Trong Lịch Sử
                  </button>
                  <button onClick={onClose} className="btn btn-tactical-secondary px-4">
                    Đóng
                  </button>
                </div>
              </div>
            ) : (
              /* Payment step with QR and bank details */
              <div>
                {/* Account info summary */}
                <div className="p-3 rounded bg-dark border border-secondary border-opacity-50 mb-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                  <div>
                    <span className="badge badge-game me-2">{gameCode}</span>
                    <span className="small text-secondary font-monospace">#{account.id}</span>
                    <h6 className="text-white fw-bold mt-1 mb-0">{account.title}</h6>
                  </div>
                  <div className="text-md-end">
                    <div className="small text-secondary font-tactical">SỐ TIỀN CẦN THANH TOÁN</div>
                    <div className="fs-3 fw-bolder text-neon">{formatVND(account.price)}</div>
                  </div>
                </div>

                <div className="row g-4 align-items-center">
                  {/* Left Column: Official TPBank QR Code */}
                  <div className="col-12 col-md-5 text-center">
                    <div className="p-3 rounded bg-black border border-secondary d-inline-block shadow">
                      <div className="small text-warning fw-bold mb-2 font-tactical">
                        <i className="bi bi-camera-fill me-1"></i> QUÉT MÃ QR TPBANK
                      </div>
                      <img
                        src={BANK_INFO.qrCodeImage}
                        alt="TPBank QR Payment"
                        className="img-fluid rounded"
                        style={{ maxWidth: '240px', width: '100%', border: '2px solid rgba(0, 255, 135, 0.4)' }}
                        onError={(e) => {
                          // Fallback to static placeholder if image path fails
                          e.target.src = 'https://api.vietqr.io/image/970423-38502042006-compact2.jpg?amount=' + account.price + '&addInfo=' + encodeURIComponent(transferContent) + '&accountName=NGUYEN%20DINH%20THE%20ANH';
                        }}
                      />
                      <div className="small text-secondary mt-2">
                        Quét bằng App TPBank hoặc bất kỳ ứng dụng Ngân hàng nào
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Bank Details & Copy helpers */}
                  <div className="col-12 col-md-7">
                    <h6 className="text-neon fw-bold font-tactical mb-3">
                      <i className="bi bi-bank2 me-1"></i> THÔNG TIN CHUYỂN KHOẢN CHÍNH THỨC
                    </h6>

                    <div className="d-flex flex-column gap-2">
                      {/* Bank Name */}
                      <div className="p-2 rounded bg-dark border border-secondary border-opacity-50 d-flex justify-content-between align-items-center">
                        <div>
                          <span className="small text-secondary d-block">Ngân hàng thụ hưởng:</span>
                          <strong className="text-white">{BANK_INFO.bankName}</strong> ({BANK_INFO.bankFullName})
                        </div>
                        <span className="badge bg-warning text-dark fw-bold">TPBank</span>
                      </div>

                      {/* Account Number */}
                      <div className="p-2 rounded bg-dark border border-secondary border-opacity-50 d-flex justify-content-between align-items-center">
                        <div>
                          <span className="small text-secondary d-block">Số tài khoản:</span>
                          <strong className="text-neon font-monospace fs-5">{BANK_INFO.accountNumber}</strong>
                        </div>
                        <button
                          onClick={() => handleCopy(BANK_INFO.accountNumber, 'accNum')}
                          className="btn btn-sm btn-outline-success"
                        >
                          {copiedField === 'accNum' ? <i className="bi bi-check2"> Đã chép</i> : <i className="bi bi-clipboard"> Sao chép</i>}
                        </button>
                      </div>

                      {/* Account Holder */}
                      <div className="p-2 rounded bg-dark border border-secondary border-opacity-50 d-flex justify-content-between align-items-center">
                        <div>
                          <span className="small text-secondary d-block">Chủ tài khoản:</span>
                          <strong className="text-white">{BANK_INFO.accountHolder}</strong>
                        </div>
                        <button
                          onClick={() => handleCopy(BANK_INFO.accountHolder, 'accHolder')}
                          className="btn btn-sm btn-outline-success"
                        >
                          {copiedField === 'accHolder' ? <i className="bi bi-check2"> Đã chép</i> : <i className="bi bi-clipboard"> Sao chép</i>}
                        </button>
                      </div>

                      {/* Transfer Content */}
                      <div className="p-2 rounded bg-dark border border-secondary border-opacity-50 d-flex justify-content-between align-items-center">
                        <div>
                          <span className="small text-warning d-block fw-bold">Nội dung chuyển khoản (Bắt buộc):</span>
                          <strong className="text-neon-cyan font-monospace">{transferContent}</strong>
                        </div>
                        <button
                          onClick={() => handleCopy(transferContent, 'note')}
                          className="btn btn-sm btn-outline-info"
                        >
                          {copiedField === 'note' ? <i className="bi bi-check2"> Đã chép</i> : <i className="bi bi-clipboard"> Sao chép</i>}
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 p-2 rounded border border-warning border-opacity-25 bg-dark bg-opacity-75 small text-light">
                      <i className="bi bi-shield-check text-warning me-1"></i>
                      Sau khi chuyển khoản thành công, hãy bấm nút <strong>"Xác Nhận Đã Chuyển Khoản"</strong> bên dưới để gửi đơn lên hệ thống duyệt.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!successTx && (
            <div className="modal-footer modal-footer-tactical">
              <button
                type="button"
                className="btn btn-tactical-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                className="btn btn-tactical px-4"
                onClick={handleConfirmPayment}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span> Đang gửi đơn...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send-check-fill me-2"></i> Xác Nhận Đã Chuyển Khoản TPBank
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
