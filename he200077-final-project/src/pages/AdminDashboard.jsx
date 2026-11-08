import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  getUsers,
  updateUser,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  formatVND,
  BANK_INFO
} from '../services/api';

const GAMES = [
  { code: 'LOL', label: 'League of Legends (LMHT)' },
  { code: 'TFT', label: 'Đấu Trường Chân Lý (TFT)' },
  { code: 'DELTA', label: 'Delta Force Tactical' },
  { code: 'LQMB', label: 'Liên Quân Mobile' }
];

const AdminDashboard = () => {
  const { user: currentAdmin } = useAuth();

  // Navigation tabs: 'APPROVAL' | 'ACCOUNTS' | 'USERS'
  const [activeTab, setActiveTab] = useState('APPROVAL');

  // Transaction / Orders State
  const [transactions, setTransactions] = useState([]);
  const [txLoading, setTxLoading] = useState(false);
  const [txFilter, setTxFilter] = useState('ALL'); // ALL, Pending, Approved, Rejected

  // Account Management State
  const [selectedGame, setSelectedGame] = useState('LOL');
  const [accounts, setAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [accountModal, setAccountModal] = useState({ open: false, mode: 'ADD', data: null });
  const [accountFormData, setAccountFormData] = useState({
    title: '',
    rank: 'Kim Cương',
    price: 500000,
    skinsCount: 50,
    championsCount: 100,
    chibiCount: 2,
    status: 'Available',
    loginUsername: '',
    loginPassword: '',
    description: ''
  });

  // User Management State
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // Feedback Notification
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: '', message: '' }), 4500);
  };

  // 1. Fetch Transactions
  const fetchTransactions = useCallback(async () => {
    try {
      setTxLoading(true);
      const data = await getTransactions();
      const list = Array.isArray(data) ? data : [];
      list.sort((a, b) => new Date(b.createdAt || b.purchaseDate || 0) - new Date(a.createdAt || a.purchaseDate || 0));
      setTransactions(list);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      showFeedback('danger', 'Không thể tải danh sách đơn hàng.');
    } finally {
      setTxLoading(false);
    }
  }, []);

  // 2. Fetch Accounts
  const fetchAccounts = useCallback(async (gameCode) => {
    try {
      setAccountsLoading(true);
      const data = await getAccounts(gameCode);
      setAccounts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching accounts:', err);
      showFeedback('danger', 'Không thể tải danh sách tài khoản: ' + err.message);
    } finally {
      setAccountsLoading(false);
    }
  }, []);

  // 3. Fetch Users
  const fetchUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching users:', err);
      showFeedback('danger', 'Không thể tải danh sách người dùng.');
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'APPROVAL') {
      fetchTransactions();
    } else if (activeTab === 'ACCOUNTS') {
      fetchAccounts(selectedGame);
    } else if (activeTab === 'USERS') {
      fetchUsers();
    }
  }, [activeTab, selectedGame, fetchTransactions, fetchAccounts, fetchUsers]);

  // Pending count for badge
  const pendingCount = useMemo(() => {
    return transactions.filter((t) => t.status === 'Pending').length;
  }, [transactions]);

  const approvedRevenue = useMemo(() => {
    return transactions
      .filter((t) => t.status === 'Approved' || t.status === 'Completed')
      .reduce((sum, t) => sum + (Number(t.price) || 0), 0);
  }, [transactions]);

  // ----------------------------------------------------
  // ADMIN APPROVAL WORKFLOW HANDLERS
  // ----------------------------------------------------
  const handleApproveOrder = async (tx) => {
    try {
      // 1. Update Transaction status to "Approved"
      await updateTransaction(tx.id, {
        status: 'Approved',
        approvedAt: new Date().toISOString(),
        approvedBy: currentAdmin?.username || 'admin'
      });

      // 2. Mark corresponding account as "Sold"
      try {
        await updateAccount(tx.gameCode, tx.accountId, { status: 'Sold' });
      } catch (accErr) {
        console.warn('Could not update account status to Sold:', accErr);
      }

      showFeedback('success', `ĐÃ DUYỆT ĐƠN #${tx.id}! Tài khoản #${tx.accountId} đã được chuyển cho ${tx.username}.`);
      fetchTransactions();
    } catch (err) {
      console.error('Failed to approve order:', err);
      showFeedback('danger', 'Lỗi khi phê duyệt đơn hàng: ' + err.message);
    }
  };

  const handleRejectOrder = async (tx) => {
    const reason = window.prompt('Nhập lý do từ chối đơn hàng (hoặc để trống):', 'Chưa nhận được chuyển khoản TPBank');
    if (reason === null) return; // User cancelled prompt

    try {
      await updateTransaction(tx.id, {
        status: 'Rejected',
        rejectReason: reason,
        rejectedAt: new Date().toISOString()
      });

      showFeedback('warning', `Đã từ chối đơn hàng #${tx.id}.`);
      fetchTransactions();
    } catch (err) {
      console.error('Failed to reject order:', err);
      showFeedback('danger', 'Lỗi khi từ chối đơn hàng.');
    }
  };

  const handleDeleteOrder = async (txId) => {
    if (!window.confirm(`Bạn có chắc muốn xóa lịch sử đơn hàng #${txId}?`)) return;
    try {
      await deleteTransaction(txId);
      showFeedback('success', `Đã xóa đơn hàng #${txId}.`);
      fetchTransactions();
    } catch (err) {
      console.error('Failed to delete order:', err);
      showFeedback('danger', 'Lỗi khi xóa đơn hàng.');
    }
  };

  // ----------------------------------------------------
  // ACCOUNT CRUD HANDLERS
  // ----------------------------------------------------
  const handleOpenAddAccount = () => {
    setAccountFormData({
      title: `Acc ${selectedGame} VIP Rank Cao`,
      rank: selectedGame === 'DELTA' ? 'Colonel' : 'Cao Thủ',
      price: 1000000,
      skinsCount: selectedGame === 'LOL' || selectedGame === 'LQMB' ? 120 : undefined,
      championsCount: selectedGame === 'LOL' || selectedGame === 'LQMB' ? 110 : undefined,
      chibiCount: selectedGame === 'TFT' ? 3 : undefined,
      status: 'Available',
      loginUsername: `${selectedGame.toLowerCase()}_vip_${Date.now().toString().slice(-4)}`,
      loginPassword: `pass_${Math.floor(1000 + Math.random() * 9000)}`,
      description: 'Acc chính chủ full thông tin, bảo hành vĩnh viễn, đổi pass tức thì.'
    });
    setAccountModal({ open: true, mode: 'ADD', data: null });
  };

  const handleOpenEditAccount = (acc) => {
    setAccountFormData({
      title: acc.title || '',
      rank: acc.rank || '',
      price: acc.price || 0,
      skinsCount: acc.skinsCount,
      championsCount: acc.championsCount,
      chibiCount: acc.chibiCount,
      status: acc.status || 'Available',
      loginUsername: acc.accountDetails?.loginUsername || '',
      loginPassword: acc.accountDetails?.loginPassword || '',
      description: acc.description || ''
    });
    setAccountModal({ open: true, mode: 'EDIT', data: acc });
  };

  const handleSaveAccount = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: accountFormData.title,
        rank: accountFormData.rank,
        price: Number(accountFormData.price) || 0,
        status: accountFormData.status,
        description: accountFormData.description,
        accountDetails: {
          loginUsername: accountFormData.loginUsername,
          loginPassword: accountFormData.loginPassword
        }
      };

      if (accountFormData.skinsCount !== undefined) payload.skinsCount = Number(accountFormData.skinsCount);
      if (accountFormData.championsCount !== undefined) payload.championsCount = Number(accountFormData.championsCount);
      if (accountFormData.chibiCount !== undefined) payload.chibiCount = Number(accountFormData.chibiCount);

      if (accountModal.mode === 'ADD') {
        payload.id = `acc_${selectedGame.toLowerCase()}_${Date.now()}`;
        await createAccount(selectedGame, payload);
        showFeedback('success', `Đã thêm mới tài khoản #${payload.id} thành công!`);
      } else {
        await updateAccount(selectedGame, accountModal.data.id, payload);
        showFeedback('success', `Cập nhật tài khoản #${accountModal.data.id} thành công!`);
      }

      setAccountModal({ open: false, mode: 'ADD', data: null });
      fetchAccounts(selectedGame);
    } catch (err) {
      console.error('Error saving account:', err);
      showFeedback('danger', 'Lỗi khi lưu tài khoản: ' + err.message);
    }
  };

  const handleDeleteAccount = async (accId) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tài khoản #${accId}?`)) return;
    try {
      await deleteAccount(selectedGame, accId);
      showFeedback('success', `Đã xóa tài khoản #${accId} thành công!`);
      fetchAccounts(selectedGame);
    } catch (err) {
      console.error('Error deleting account:', err);
      showFeedback('danger', 'Lỗi khi xóa tài khoản: ' + err.message);
    }
  };

  const handleToggleAccountStatus = async (acc) => {
    try {
      const nextStatus = acc.status === 'Available' ? 'Sold' : 'Available';
      await updateAccount(selectedGame, acc.id, { status: nextStatus });
      showFeedback('success', `Đã đổi trạng thái acc #${acc.id} sang ${nextStatus}!`);
      fetchAccounts(selectedGame);
    } catch (err) {
      console.error('Error toggling status:', err);
      showFeedback('danger', 'Lỗi đổi trạng thái tài khoản.');
    }
  };

  // ----------------------------------------------------
  // USER MANAGEMENT HANDLERS
  // ----------------------------------------------------
  const handleToggleUserStatus = async (u) => {
    if (u.id === currentAdmin.id) {
      alert('Không thể khóa chính tài khoản Admin bạn đang đăng nhập!');
      return;
    }

    try {
      const nextStatus = u.status === 'Active' ? 'Inactive' : 'Active';
      await updateUser(u.id, { status: nextStatus });
      showFeedback('success', `Tài khoản ${u.username} đã được chuyển sang trạng thái: ${nextStatus}`);
      fetchUsers();
    } catch (err) {
      console.error('Failed to update user status:', err);
      showFeedback('danger', 'Lỗi khi cập nhật trạng thái người dùng.');
    }
  };

  const handleToggleUserRole = async (u) => {
    if (u.id === currentAdmin.id) {
      alert('Không thể hạ quyền chính tài khoản Admin bạn đang dùng!');
      return;
    }

    try {
      const nextRole = u.role === 'Admin' ? 'User' : 'Admin';
      await updateUser(u.id, { role: nextRole });
      showFeedback('success', `Đã đổi vai trò của ${u.username} thành: ${nextRole}`);
      fetchUsers();
    } catch (err) {
      console.error('Failed to update user role:', err);
      showFeedback('danger', 'Lỗi cập nhật vai trò người dùng.');
    }
  };

  // Filtered transactions in Approval Tab
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (txFilter !== 'ALL') {
        if (txFilter === 'Approved') {
          return t.status === 'Approved' || t.status === 'Completed';
        }
        return t.status === txFilter;
      }
      return true;
    });
  }, [transactions, txFilter]);

  return (
    <div className="admin-dashboard-page py-4">
      <div className="container">
        {/* Admin Header HUD */}
        <div className="card card-tactical p-4 mb-4 border-warning">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-warning text-dark fw-bold font-tactical px-2 py-1">
                  <i className="bi bi-shield-lock-fill me-1"></i> ADMIN PORTAL & APPROVAL CENTER
                </span>
                <span className="text-secondary small font-monospace">
                  Quản trị viên: <strong className="text-white">{currentAdmin?.fullName || currentAdmin?.username}</strong>
                </span>
              </div>
              <h2 className="text-white fw-bold font-heading mb-1">TRUNG TÂM PHÊ DUYỆT & QUẢN TRỊ</h2>
              <p className="text-secondary small mb-0">
                Xác nhận chuyển khoản ngân hàng TPBank ({BANK_INFO.accountNumber}), duyệt đơn cấp tài khoản và quản lý kho acc 4 tựa game.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="d-flex gap-2">
              <div className="stat-box p-2 px-3 text-center border-warning">
                <div className="small text-warning font-tactical fw-bold">Chờ Duyệt</div>
                <div className="fs-4 fw-bold text-warning">{pendingCount}</div>
              </div>
              <div className="stat-box p-2 px-3 text-center">
                <div className="small text-secondary font-tactical">Doanh Thu TPBank</div>
                <div className="fs-5 fw-bold text-neon">{formatVND(approvedRevenue)}</div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="d-flex flex-wrap gap-2 mt-4 pt-3 border-top border-secondary border-opacity-25">
            <button
              onClick={() => setActiveTab('APPROVAL')}
              className={`btn position-relative ${activeTab === 'APPROVAL' ? 'btn-tactical' : 'btn-tactical-secondary'}`}
            >
              <i className="bi bi-patch-check-fill me-2"></i> Phê Duyệt Đơn Hàng TPBank
              {pendingCount > 0 && (
                <span className="badge bg-danger text-white ms-2 px-2 py-1">
                  {pendingCount} Mới
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('ACCOUNTS')}
              className={`btn ${activeTab === 'ACCOUNTS' ? 'btn-tactical' : 'btn-tactical-secondary'}`}
            >
              <i className="bi bi-grid-3x3-gap-fill me-2"></i> Quản Lý Kho Tài Khoản (CRUD)
            </button>
            <button
              onClick={() => setActiveTab('USERS')}
              className={`btn ${activeTab === 'USERS' ? 'btn-tactical' : 'btn-tactical-secondary'}`}
            >
              <i className="bi bi-people-fill me-2"></i> Quản Lý Người Dùng & Khóa Acc
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {feedback.message && (
          <div className={`alert alert-tactical alert-tactical-${feedback.type} p-3 mb-4 d-flex align-items-center gap-2`}>
            <i className="bi bi-info-circle fs-4"></i>
            <div>{feedback.message}</div>
          </div>
        )}

        {/* TAB 1: ORDER APPROVAL WORKFLOW */}
        {activeTab === 'APPROVAL' && (
          <div className="card card-tactical overflow-hidden mb-4">
            <div className="p-3 border-bottom border-secondary border-opacity-25 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <h5 className="text-white fw-bold mb-0 font-heading">
                  <i className="bi bi-receipt-cutoff text-warning me-2"></i> DANH SÁCH ĐƠN HÀNG CHỜ PHÊ DUYỆT
                </h5>
                <div className="small text-secondary">
                  Kiểm tra sao kê TPBank <code>{BANK_INFO.accountNumber}</code> và duyệt để mở khóa thông tin tài khoản cho khách.
                </div>
              </div>

              {/* Status filter tabs */}
              <div className="d-flex gap-2">
                {['ALL', 'Pending', 'Approved', 'Rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setTxFilter(status)}
                    className={`btn btn-sm ${
                      txFilter === status ? 'btn-tactical-cyan' : 'btn-tactical-secondary'
                    }`}
                  >
                    {status === 'ALL'
                      ? 'Tất Cả'
                      : status === 'Pending'
                      ? `Chờ Duyệt (${pendingCount})`
                      : status === 'Approved'
                      ? 'Đã Duyệt'
                      : 'Bị Từ Chối'}
                  </button>
                ))}
                <button onClick={fetchTransactions} className="btn btn-sm btn-tactical-secondary" title="Làm mới">
                  <i className="bi bi-arrow-clockwise"></i>
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0 align-middle">
                <thead style={{ backgroundColor: '#0e1622', borderBottom: '1px solid rgba(0,255,135,0.2)' }}>
                  <tr className="small text-tactical-muted font-tactical">
                    <th scope="col" className="py-3 px-3">MÃ ĐƠN</th>
                    <th scope="col" className="py-3">NGƯỜI MUA</th>
                    <th scope="col" className="py-3">TÀI KHOẢN MUA</th>
                    <th scope="col" className="py-3">SỐ TIỀN</th>
                    <th scope="col" className="py-3">NỘI DUNG CHUYỂN KHOẢN</th>
                    <th scope="col" className="py-3">THỜI GIAN</th>
                    <th scope="col" className="py-3">TRẠNG THÁI</th>
                    <th scope="col" className="py-3 px-3 text-end">PHÊ DUYỆT ĐƠN</th>
                  </tr>
                </thead>
                <tbody>
                  {txLoading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-5">
                        <div className="spinner-border text-neon mb-2"></div>
                        <div className="text-secondary small">Đang nạp dữ liệu đơn hàng...</div>
                      </td>
                    </tr>
                  ) : filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => {
                      const isPending = tx.status === 'Pending';
                      const isApproved = tx.status === 'Approved' || tx.status === 'Completed';
                      const isRejected = tx.status === 'Rejected';

                      return (
                        <tr
                          key={tx.id}
                          style={{
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            backgroundColor: isPending ? 'rgba(255, 184, 0, 0.05)' : 'transparent'
                          }}
                        >
                          <td className="px-3 font-monospace small text-secondary">#{tx.id}</td>
                          <td>
                            <strong className="text-white">{tx.username}</strong>
                            <div className="small text-muted font-monospace">User ID: {tx.userId}</div>
                          </td>
                          <td>
                            <div className="fw-semibold text-white text-truncate max-w-250">
                              {tx.accountTitle}
                            </div>
                            <span className="badge badge-game me-1">{tx.gameCode}</span>
                            <span className="small text-secondary font-monospace">Acc ID: {tx.accountId}</span>
                          </td>
                          <td className="fw-bold text-neon fs-6">{formatVND(tx.price)}</td>
                          <td>
                            <span className="badge bg-dark border border-secondary text-neon-cyan font-monospace px-2 py-1">
                              {tx.transferNote || `BONGGO ${tx.username} ${tx.accountId}`}
                            </span>
                          </td>
                          <td className="small text-secondary">
                            {tx.createdAt || tx.purchaseDate ? new Date(tx.createdAt || tx.purchaseDate).toLocaleString('vi-VN') : 'N/A'}
                          </td>
                          <td>
                            {isPending && (
                              <span className="badge bg-warning text-dark fw-bold px-2 py-1">
                                <i className="bi bi-hourglass-split me-1"></i> Chờ Duyệt
                              </span>
                            )}
                            {isApproved && (
                              <span className="badge bg-success text-dark fw-bold px-2 py-1">
                                <i className="bi bi-check-circle-fill me-1"></i> Đã Duyệt
                              </span>
                            )}
                            {isRejected && (
                              <span className="badge bg-danger text-white fw-bold px-2 py-1">
                                <i className="bi bi-x-circle-fill me-1"></i> Bị Từ Chối
                              </span>
                            )}
                          </td>
                          <td className="px-3 text-end">
                            {isPending ? (
                              <div className="btn-group">
                                <button
                                  onClick={() => handleApproveOrder(tx)}
                                  className="btn btn-sm btn-success fw-bold"
                                  title="Xác nhận đã nhận tiền TPBank và cấp acc"
                                >
                                  <i className="bi bi-check-lg me-1"></i> Duyệt Đơn
                                </button>
                                <button
                                  onClick={() => handleRejectOrder(tx)}
                                  className="btn btn-sm btn-danger"
                                  title="Từ chối đơn hàng"
                                >
                                  <i className="bi bi-x-lg"></i>
                                </button>
                              </div>
                            ) : (
                              <div className="d-flex justify-content-end align-items-center gap-2">
                                <span className="small text-secondary">
                                  {isApproved ? 'Đã cấp mật khẩu' : 'Đã hủy'}
                                </span>
                                <button
                                  onClick={() => handleDeleteOrder(tx.id)}
                                  className="btn btn-sm btn-outline-secondary py-0 px-2 text-danger"
                                  title="Xóa bản ghi"
                                >
                                  <i className="bi bi-trash"></i>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-5 text-secondary">
                        Không có đơn hàng nào trong mục này.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ACCOUNTS CRUD */}
        {activeTab === 'ACCOUNTS' && (
          <div>
            {/* Game Selector Bar & Add Button */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
              <div className="d-flex flex-wrap gap-2">
                {GAMES.map((g) => (
                  <button
                    key={g.code}
                    onClick={() => setSelectedGame(g.code)}
                    className={`btn btn-sm ${
                      selectedGame === g.code ? 'btn-tactical-cyan' : 'btn-tactical-secondary'
                    }`}
                  >
                    <span className="fw-bold">{g.code}</span> - {g.label}
                  </button>
                ))}
              </div>

              <button onClick={handleOpenAddAccount} className="btn btn-tactical">
                <i className="bi bi-plus-circle-fill me-2"></i> Thêm Tài Khoản {selectedGame} Mới
              </button>
            </div>

            {/* Accounts Table */}
            <div className="card card-tactical overflow-hidden mb-4">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0 align-middle">
                  <thead style={{ backgroundColor: '#0e1622', borderBottom: '1px solid rgba(0,255,135,0.2)' }}>
                    <tr className="small text-tactical-muted font-tactical">
                      <th scope="col" className="py-3 px-3">MÃ ACC</th>
                      <th scope="col" className="py-3">TIÊU ĐỀ</th>
                      <th scope="col" className="py-3">RANK</th>
                      <th scope="col" className="py-3">THÔNG SỐ</th>
                      <th scope="col" className="py-3">GIÁ TIỀN</th>
                      <th scope="col" className="py-3">TRẠNG THÁI</th>
                      <th scope="col" className="py-3 px-3 text-end">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountsLoading ? (
                      <tr>
                        <td colSpan="7" className="text-center py-5">
                          <div className="spinner-border text-neon mb-2"></div>
                          <div className="text-secondary small">Đang nạp dữ liệu {selectedGame}...</div>
                        </td>
                      </tr>
                    ) : accounts.length > 0 ? (
                      accounts.map((acc) => {
                        const isAvail = acc.status === 'Available';
                        return (
                          <tr key={acc.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td className="px-3 font-monospace small text-secondary">#{acc.id}</td>
                            <td>
                              <div className="fw-bold text-white text-truncate max-w-300">
                                {acc.title}
                              </div>
                              <div className="small text-secondary font-monospace">
                                User: {acc.accountDetails?.loginUsername || 'N/A'}
                              </div>
                            </td>
                            <td>
                              <span className="badge-rank">{acc.rank}</span>
                            </td>
                            <td className="small text-secondary">
                              {acc.skinsCount !== undefined && <div>Skin: {acc.skinsCount}</div>}
                              {acc.championsCount !== undefined && <div>Tướng: {acc.championsCount}</div>}
                              {acc.chibiCount !== undefined && <div>Chibi: {acc.chibiCount}</div>}
                            </td>
                            <td className="fw-bold text-neon">{formatVND(acc.price)}</td>
                            <td>
                              <button
                                onClick={() => handleToggleAccountStatus(acc)}
                                className={`badge border-0 cursor-pointer ${
                                  isAvail ? 'badge-status available' : 'badge-status sold'
                                }`}
                                title="Bấm vào để đổi trạng thái"
                              >
                                {isAvail ? 'Available (Sẵn sàng)' : 'Sold (Đã bán)'}
                              </button>
                            </td>
                            <td className="px-3 text-end">
                              <div className="btn-group">
                                <button
                                  onClick={() => handleOpenEditAccount(acc)}
                                  className="btn btn-sm btn-outline-info"
                                  title="Chỉnh sửa tài khoản"
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </button>
                                <button
                                  onClick={() => handleDeleteAccount(acc.id)}
                                  className="btn btn-sm btn-outline-danger"
                                  title="Xóa tài khoản"
                                >
                                  <i className="bi bi-trash-fill"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-5 text-secondary">
                          Chưa có tài khoản nào trong danh mục {selectedGame}.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: USERS MANAGEMENT */}
        {activeTab === 'USERS' && (
          <div className="card card-tactical overflow-hidden mb-4">
            <div className="p-3 border-bottom border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
              <h5 className="text-white fw-bold mb-0 font-heading">
                <i className="bi bi-people-fill text-neon me-2"></i> DANH SÁCH NGƯỜI DÙNG & PHÂN QUYỀN
              </h5>
              <button onClick={fetchUsers} className="btn btn-sm btn-tactical-secondary">
                <i className="bi bi-arrow-clockwise me-1"></i> Làm Mới
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0 align-middle">
                <thead style={{ backgroundColor: '#0e1622', borderBottom: '1px solid rgba(0,255,135,0.2)' }}>
                  <tr className="small text-tactical-muted font-tactical">
                    <th scope="col" className="py-3 px-3">MÃ ID</th>
                    <th scope="col" className="py-3">TÀI KHOẢN</th>
                    <th scope="col" className="py-3">HỌ VÀ TÊN</th>
                    <th scope="col" className="py-3">EMAIL</th>
                    <th scope="col" className="py-3">VAI TRÒ (ROLE)</th>
                    <th scope="col" className="py-3">TRẠNG THÁI (STATUS)</th>
                    <th scope="col" className="py-3 px-3 text-end">THAO TÁC</th>
                  </tr>
                </thead>
                <tbody>
                  {usersLoading ? (
                    <tr>
                      <td colSpan="7" className="text-center py-5">
                        <div className="spinner-border text-neon mb-2"></div>
                        <div className="text-secondary small">Đang tải danh sách người dùng...</div>
                      </td>
                    </tr>
                  ) : users.map((u) => {
                    const isActive = u.status === 'Active';
                    const isAdmin = u.role === 'Admin';
                    const isSelf = u.id === currentAdmin?.id;

                    return (
                      <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td className="px-3 font-monospace small text-secondary">#{u.id}</td>
                        <td className="fw-bold text-white">
                          {u.username} {isSelf && <span className="badge bg-secondary ms-1">Bạn</span>}
                        </td>
                        <td className="text-light">{u.fullName || 'Chưa cập nhật'}</td>
                        <td className="text-secondary small">{u.email}</td>
                        <td>
                          <span
                            className={`badge ${
                              isAdmin ? 'bg-warning text-dark fw-bold' : 'bg-primary text-white'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              isActive ? 'bg-success text-dark fw-bold' : 'bg-danger text-white'
                            }`}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="px-3 text-end">
                          <div className="btn-group">
                            {/* Toggle Status (Active / Inactive) */}
                            <button
                              onClick={() => handleToggleUserStatus(u)}
                              disabled={isSelf}
                              className={`btn btn-sm ${
                                isActive ? 'btn-outline-danger' : 'btn-outline-success'
                              }`}
                              title={isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                            >
                              <i className={`bi ${isActive ? 'bi-lock-fill' : 'bi-unlock-fill'} me-1`}></i>
                              {isActive ? 'Khóa' : 'Mở Khóa'}
                            </button>

                            {/* Toggle Role (Admin / User) */}
                            <button
                              onClick={() => handleToggleUserRole(u)}
                              disabled={isSelf}
                              className="btn btn-sm btn-outline-warning"
                              title="Đổi vai trò giữa Admin và User"
                            >
                              <i className="bi bi-arrow-repeat me-1"></i>
                              {isAdmin ? 'Về User' : 'Lên Admin'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ADD / EDIT ACCOUNT MODAL */}
        {accountModal.open && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content modal-content-tactical">
                <form onSubmit={handleSaveAccount}>
                  <div className="modal-header modal-header-tactical">
                    <h5 className="modal-title text-neon fw-bold font-heading">
                      {accountModal.mode === 'ADD'
                        ? `THÊM TÀI KHOẢN MỚI (${selectedGame})`
                        : `CHỈNH SỬA TÀI KHOẢN #${accountModal.data?.id}`}
                    </h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => setAccountModal({ open: false, mode: 'ADD', data: null })}
                    ></button>
                  </div>

                  <div className="modal-body p-4">
                    <div className="row g-3">
                      {/* Title */}
                      <div className="col-12">
                        <label className="form-label small text-tactical-muted font-tactical fw-bold">
                          TIÊU ĐỀ TÀI KHOẢN
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-tactical"
                          value={accountFormData.title}
                          onChange={(e) =>
                            setAccountFormData({ ...accountFormData, title: e.target.value })
                          }
                          required
                        />
                      </div>

                      {/* Rank & Price */}
                      <div className="col-12 col-md-6">
                        <label className="form-label small text-tactical-muted font-tactical fw-bold">
                          THỨ HẠNG (RANK)
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-tactical"
                          placeholder="Thách Đấu, Cao Thủ, General..."
                          value={accountFormData.rank}
                          onChange={(e) =>
                            setAccountFormData({ ...accountFormData, rank: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label small text-tactical-muted font-tactical fw-bold">
                          GIÁ BÁN (VND)
                        </label>
                        <input
                          type="number"
                          className="form-control form-control-tactical"
                          value={accountFormData.price}
                          onChange={(e) =>
                            setAccountFormData({ ...accountFormData, price: e.target.value })
                          }
                          required
                        />
                      </div>

                      {/* Game Specific Fields */}
                      {(selectedGame === 'LOL' || selectedGame === 'LQMB') && (
                        <>
                          <div className="col-6 col-md-6">
                            <label className="form-label small text-tactical-muted font-tactical fw-bold">
                              SỐ TRANG PHỤC (SKINS)
                            </label>
                            <input
                              type="number"
                              className="form-control form-control-tactical"
                              value={accountFormData.skinsCount || 0}
                              onChange={(e) =>
                                setAccountFormData({ ...accountFormData, skinsCount: e.target.value })
                              }
                            />
                          </div>

                          <div className="col-6 col-md-6">
                            <label className="form-label small text-tactical-muted font-tactical fw-bold">
                              SỐ TƯỚNG (CHAMPIONS)
                            </label>
                            <input
                              type="number"
                              className="form-control form-control-tactical"
                              value={accountFormData.championsCount || 0}
                              onChange={(e) =>
                                setAccountFormData({
                                  ...accountFormData,
                                  championsCount: e.target.value
                                })
                              }
                            />
                          </div>
                        </>
                      )}

                      {selectedGame === 'TFT' && (
                        <div className="col-12 col-md-6">
                          <label className="form-label small text-tactical-muted font-tactical fw-bold">
                            SỐ LINH THÚ CHIBI
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-tactical"
                            value={accountFormData.chibiCount || 0}
                            onChange={(e) =>
                              setAccountFormData({ ...accountFormData, chibiCount: e.target.value })
                            }
                          />
                        </div>
                      )}

                      {/* Status */}
                      <div className="col-12 col-md-6">
                        <label className="form-label small text-tactical-muted font-tactical fw-bold">
                          TRẠNG THÁI HIỆN TẠI
                        </label>
                        <select
                          className="form-select form-select-tactical"
                          value={accountFormData.status}
                          onChange={(e) =>
                            setAccountFormData({ ...accountFormData, status: e.target.value })
                          }
                        >
                          <option value="Available">Available (Chưa bán)</option>
                          <option value="Sold">Sold (Đã bán)</option>
                        </select>
                      </div>

                      {/* Login Credentials */}
                      <div className="col-12 col-md-6">
                        <label className="form-label small text-neon font-tactical fw-bold">
                          TÀI KHOẢN ĐĂNG NHẬP (USERNAME)
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-tactical"
                          value={accountFormData.loginUsername}
                          onChange={(e) =>
                            setAccountFormData({
                              ...accountFormData,
                              loginUsername: e.target.value
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label small text-neon font-tactical fw-bold">
                          MẬT KHẨU ĐĂNG NHẬP (PASSWORD)
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-tactical"
                          value={accountFormData.loginPassword}
                          onChange={(e) =>
                            setAccountFormData({
                              ...accountFormData,
                              loginPassword: e.target.value
                            })
                          }
                          required
                        />
                      </div>

                      {/* Description */}
                      <div className="col-12">
                        <label className="form-label small text-tactical-muted font-tactical fw-bold">
                          MÔ TẢ CHI TIẾT
                        </label>
                        <textarea
                          rows="3"
                          className="form-control form-control-tactical"
                          value={accountFormData.description}
                          onChange={(e) =>
                            setAccountFormData({ ...accountFormData, description: e.target.value })
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer modal-footer-tactical">
                    <button
                      type="button"
                      className="btn btn-tactical-secondary"
                      onClick={() => setAccountModal({ open: false, mode: 'ADD', data: null })}
                    >
                      Hủy Bỏ
                    </button>
                    <button type="submit" className="btn btn-tactical">
                      <i className="bi bi-save me-1"></i> Lưu Dữ Liệu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
