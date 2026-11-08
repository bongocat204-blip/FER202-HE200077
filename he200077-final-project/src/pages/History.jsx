import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTransactions, formatVND } from '../services/api';

const History = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [filterGame, setFilterGame] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL'); // ALL, Pending, Approved, Rejected
  const [searchQuery, setSearchQuery] = useState('');

  // Credentials Modal for Approved orders
  const [selectedTx, setSelectedTx] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTransactions();
        // Filter transactions for currently logged in user
        const userTxList = (Array.isArray(data) ? data : []).filter(
          (tx) => tx.userId === user?.id || tx.username === user?.username
        );
        // Sort newest first
        userTxList.sort((a, b) => new Date(b.createdAt || b.purchaseDate || 0) - new Date(a.createdAt || a.purchaseDate || 0));
        setTransactions(userTxList);
      } catch (err) {
        console.error('Failed to load transactions:', err);
        setError('Không thể tải lịch sử giao dịch từ máy chủ API.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchUserTransactions();
    }
  }, [user]);

  // Compute metrics
  const totalApproved = useMemo(() => {
    return transactions.filter((tx) => tx.status === 'Approved' || tx.status === 'Completed').length;
  }, [transactions]);

  const totalPending = useMemo(() => {
    return transactions.filter((tx) => tx.status === 'Pending').length;
  }, [transactions]);

  const totalSpent = useMemo(() => {
    return transactions
      .filter((tx) => tx.status === 'Approved' || tx.status === 'Completed')
      .reduce((sum, tx) => sum + (Number(tx.price) || 0), 0);
  }, [transactions]);

  // Filtered list
  const filteredList = useMemo(() => {
    return transactions.filter((tx) => {
      if (filterGame !== 'ALL' && tx.gameCode !== filterGame) return false;
      if (filterStatus !== 'ALL') {
        if (filterStatus === 'Approved') {
          if (tx.status !== 'Approved' && tx.status !== 'Completed') return false;
        } else if (tx.status !== filterStatus) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (tx.accountTitle || '').toLowerCase().includes(q);
        const matchId = (tx.id || '').toLowerCase().includes(q);
        if (!matchTitle && !matchId) return false;
      }
      return true;
    });
  }, [transactions, filterGame, filterStatus, searchQuery]);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="history-page py-4">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/Home" className="text-secondary text-decoration-none">
                Trang Chủ
              </Link>
            </li>
            <li className="breadcrumb-item active text-neon" aria-current="page">
              Lịch Sử Mua Hàng & Duyệt Đơn
            </li>
          </ol>
        </nav>

        {/* Header HUD Banner */}
        <div className="card card-tactical p-4 mb-4">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-success bg-opacity-25 text-neon border border-success">
                  <i className="bi bi-clock-history me-1"></i> TỦ ĐỒ TÀI KHOẢN
                </span>
                <span className="text-secondary small">Tài khoản: {user?.username}</span>
              </div>
              <h2 className="text-white fw-bold font-heading mb-1">LỊCH SỬ ĐƠN HÀNG TPBANK</h2>
              <p className="text-secondary small mb-0">
                Theo dõi trạng thái duyệt đơn từ Quản trị viên và nhận thông tin tài khoản đăng nhập sau khi duyệt thành công.
              </p>
            </div>

            {/* Metrics */}
            <div className="col-12 col-md-6 mt-3 mt-md-0">
              <div className="row g-2 text-center">
                <div className="col-3">
                  <div className="p-2 rounded bg-dark border border-secondary border-opacity-25">
                    <div className="small text-secondary font-tactical">Tổng Đơn</div>
                    <div className="fs-5 fw-bold text-white">{transactions.length}</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="p-2 rounded bg-dark border border-secondary border-opacity-25">
                    <div className="small text-secondary font-tactical">Chờ Duyệt</div>
                    <div className="fs-5 fw-bold text-warning">{totalPending}</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="p-2 rounded bg-dark border border-secondary border-opacity-25">
                    <div className="small text-secondary font-tactical">Đã Duyệt</div>
                    <div className="fs-5 fw-bold text-neon">{totalApproved}</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="p-2 rounded bg-dark border border-secondary border-opacity-25">
                    <div className="small text-secondary font-tactical">Tổng Tiền</div>
                    <div className="small fw-bold text-neon text-truncate">{formatVND(totalSpent)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="card card-tactical p-3 mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-5">
              <input
                type="text"
                className="form-control form-control-tactical"
                placeholder="Tìm theo mã đơn hoặc tên tài khoản..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="col-6 col-md-3">
              <select
                className="form-select form-select-tactical"
                value={filterGame}
                onChange={(e) => setFilterGame(e.target.value)}
              >
                <option value="ALL">Tất cả game</option>
                <option value="LOL">League of Legends (LOL)</option>
                <option value="TFT">Teamfight Tactics (TFT)</option>
                <option value="DELTA">Delta Force</option>
                <option value="LQMB">Liên Quân Mobile</option>
              </select>
            </div>

            <div className="col-6 col-md-3">
              <select
                className="form-select form-select-tactical"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="ALL">Tất cả trạng thái</option>
                <option value="Pending">Chờ Duyệt (Pending)</option>
                <option value="Approved">Đã Duyệt (Approved)</option>
                <option value="Rejected">Bị Từ Chối (Rejected)</option>
              </select>
            </div>

            <div className="col-12 col-md-1 text-md-end">
              <button
                onClick={() => {
                  setFilterGame('ALL');
                  setFilterStatus('ALL');
                  setSearchQuery('');
                }}
                className="btn btn-sm btn-tactical-secondary w-100"
                title="Đặt lại bộ lọc"
              >
                <i className="bi bi-arrow-counterclockwise"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="alert alert-tactical alert-tactical-danger p-3 mb-4">
            <i className="bi bi-exclamation-triangle me-2"></i> {error}
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-neon mb-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary font-tactical">Đang đồng bộ dữ liệu giao dịch...</p>
          </div>
        ) : filteredList.length > 0 ? (
          /* Transaction Table */
          <div className="card card-tactical overflow-hidden mb-4">
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0 align-middle">
                <thead style={{ backgroundColor: '#0e1622', borderBottom: '1px solid rgba(0, 255, 135, 0.2)' }}>
                  <tr className="small text-tactical-muted font-tactical">
                    <th scope="col" className="py-3 px-3">MÃ ĐƠN</th>
                    <th scope="col" className="py-3">GAME</th>
                    <th scope="col" className="py-3">TÊN TÀI KHOẢN</th>
                    <th scope="col" className="py-3">GIÁ TIỀN</th>
                    <th scope="col" className="py-3">THỜI GIAN</th>
                    <th scope="col" className="py-3">TRẠNG THÁI</th>
                    <th scope="col" className="py-3 px-3 text-end">TÀI KHOẢN & MẬT KHẨU</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((tx) => {
                    const isApproved = tx.status === 'Approved' || tx.status === 'Completed';
                    const isPending = tx.status === 'Pending';
                    const isRejected = tx.status === 'Rejected';

                    return (
                      <tr key={tx.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td className="px-3 font-monospace small text-secondary">#{tx.id}</td>
                        <td>
                          <span className="badge badge-game">{tx.gameCode}</span>
                        </td>
                        <td>
                          <div className="fw-semibold text-white text-truncate max-w-300">
                            {tx.accountTitle}
                          </div>
                          <span className="small text-muted font-monospace">Acc ID: {tx.accountId}</span>
                        </td>
                        <td className="fw-bold text-neon">{formatVND(tx.price)}</td>
                        <td className="small text-secondary">
                          {tx.createdAt || tx.purchaseDate ? new Date(tx.createdAt || tx.purchaseDate).toLocaleString('vi-VN') : 'Mới đây'}
                        </td>
                        <td>
                          {isPending && (
                            <span className="badge bg-warning text-dark fw-bold">
                              <i className="bi bi-hourglass-split me-1"></i> Chờ Duyệt
                            </span>
                          )}
                          {isApproved && (
                            <span className="badge bg-success text-dark fw-bold">
                              <i className="bi bi-check-circle-fill me-1"></i> Đã Duyệt
                            </span>
                          )}
                          {isRejected && (
                            <span className="badge bg-danger text-white fw-bold">
                              <i className="bi bi-x-circle-fill me-1"></i> Bị Từ Chối
                            </span>
                          )}
                        </td>
                        <td className="px-3 text-end">
                          {isApproved ? (
                            <button
                              onClick={() => setSelectedTx(tx)}
                              className="btn btn-sm btn-tactical"
                            >
                              <i className="bi bi-key-fill me-1"></i> Lấy Thông Tin
                            </button>
                          ) : isPending ? (
                            <span className="small text-warning">
                              <i className="bi bi-clock me-1"></i> Chờ Admin check TPBank
                            </span>
                          ) : (
                            <span className="small text-secondary">Không khả dụng</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="card card-tactical text-center p-5">
            <div
              className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
              style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <i className="bi bi-bag-x fs-1 text-secondary"></i>
            </div>
            <h4 className="text-white fw-bold mb-2">Chưa Có Đơn Hàng Nào</h4>
            <p className="text-secondary small max-w-500 mx-auto mb-4">
              Bạn chưa thực hiện giao dịch mua tài khoản nào trên BonggoShop.skin. Hãy chọn ngay tài khoản ưng ý và thanh toán qua QR TPBank siêu tiện lợi!
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/Home/g_lol" className="btn btn-tactical">
                <i className="bi bi-shop me-2"></i> Mua Acc LOL
              </Link>
              <Link to="/Home" className="btn btn-tactical-cyan">
                <i className="bi bi-grid-fill me-2"></i> Xem Tất Cả Game
              </Link>
            </div>
          </div>
        )}

        {/* CREDENTIALS DETAIL MODAL (Only available for Approved orders) */}
        {selectedTx && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1060 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content modal-content-tactical">
                <div className="modal-header modal-header-tactical">
                  <h5 className="modal-title text-neon fw-bold font-heading">
                    <i className="bi bi-shield-lock-fill me-2"></i> THÔNG TIN ĐĂNG NHẬP GAME
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setSelectedTx(null)}
                  ></button>
                </div>

                <div className="modal-body p-4">
                  <div className="mb-3">
                    <span className="badge badge-game me-2">{selectedTx.gameCode}</span>
                    <span className="badge bg-success text-dark fw-bold me-2">ĐÃ DUYỆT</span>
                    <span className="small text-secondary font-monospace">Mã đơn: #{selectedTx.id}</span>
                    <h6 className="text-white fw-bold mt-2">{selectedTx.accountTitle}</h6>
                  </div>

                  {/* Account Login Credentials */}
                  <div className="p-3 bg-dark rounded border border-secondary border-opacity-50 mb-3">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <label className="small text-secondary fw-bold">TÀI KHOẢN (LOGIN USERNAME):</label>
                        <button
                          onClick={() =>
                            handleCopy(
                              selectedTx.accountDetails?.loginUsername || `gamer_${selectedTx.accountId}`,
                              'user'
                            )
                          }
                          className="btn btn-sm btn-outline-success py-0 px-2"
                        >
                          {copiedField === 'user' ? (
                            <i className="bi bi-check2"> Đã chép</i>
                          ) : (
                            <i className="bi bi-clipboard"> Sao chép</i>
                          )}
                        </button>
                      </div>
                      <input
                        type="text"
                        readOnly
                        className="form-control form-control-tactical font-monospace text-white fw-bold"
                        value={selectedTx.accountDetails?.loginUsername || `gamer_${selectedTx.accountId}`}
                      />
                    </div>

                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <label className="small text-secondary fw-bold">MẬT KHẨU (PASSWORD):</label>
                        <button
                          onClick={() =>
                            handleCopy(
                              selectedTx.accountDetails?.loginPassword || `pass_${selectedTx.accountId}`,
                              'pass'
                            )
                          }
                          className="btn btn-sm btn-outline-success py-0 px-2"
                        >
                          {copiedField === 'pass' ? (
                            <i className="bi bi-check2"> Đã chép</i>
                          ) : (
                            <i className="bi bi-clipboard"> Sao chép</i>
                          )}
                        </button>
                      </div>
                      <input
                        type="text"
                        readOnly
                        className="form-control form-control-tactical font-monospace text-neon fw-bold"
                        value={selectedTx.accountDetails?.loginPassword || `pass_${selectedTx.accountId}`}
                      />
                    </div>
                  </div>

                  <div className="small text-tactical-muted">
                    <i className="bi bi-info-circle text-warning me-1"></i>
                    Đơn hàng đã được Quản trị viên phê duyệt chuyển khoản thành công. Vui lòng liên kết email / SĐT cá nhân của bạn để bảo mật tài khoản.
                  </div>
                </div>

                <div className="modal-footer modal-footer-tactical">
                  <button
                    type="button"
                    className="btn btn-tactical"
                    onClick={() => setSelectedTx(null)}
                  >
                    Xác Nhận & Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
