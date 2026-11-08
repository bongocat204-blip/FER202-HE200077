import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Target destination after successful login
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim() || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ Tên đăng nhập/Email và Mật khẩu.');
      return;
    }

    try {
      setLoading(true);
      await login(identifier, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Đăng nhập không thành công.');
    } finally {
      setLoading(false);
    }
  };

  // Quick fill demo accounts for testing convenience
  const handleQuickFill = (u, p) => {
    setIdentifier(u);
    setPassword(p);
    setErrorMessage('');
  };

  return (
    <div className="login-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="card card-tactical p-4 p-md-5">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="brand-badge mb-2 d-inline-flex">
                  <i className="bi bi-shield-lock-fill text-neon"></i>
                  <span>SECURITY AUTH</span>
                </div>
                <h2 className="text-white fw-bold font-heading">ĐĂNG NHẬP HỆ THỐNG</h2>
                <p className="text-secondary small">
                  Truy cập tài khoản BonggoShop.skin để mua và quản lý tài khoản game.
                </p>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="alert alert-tactical alert-tactical-danger p-3 mb-4 d-flex align-items-center gap-2">
                  <i className="bi bi-shield-x fs-4"></i>
                  <div className="small fw-semibold">{errorMessage}</div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small text-tactical-muted font-tactical fw-bold">
                    TÊN ĐĂNG NHẬP HOẶC EMAIL
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary text-secondary">
                      <i className="bi bi-person-fill text-neon"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-tactical"
                      placeholder="admin hoặc buyer01"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label small text-tactical-muted font-tactical fw-bold mb-0">
                      MẬT KHẨU
                    </label>
                    <span className="small text-secondary" style={{ fontSize: '0.8rem' }}>
                      Bảo mật 256-bit
                    </span>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary text-secondary">
                      <i className="bi bi-lock-fill text-neon"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control form-control-tactical"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-tactical w-100 py-3 mb-3 fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span> ĐANG XÁC THỰC...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i> ĐĂNG NHẬP
                    </>
                  )}
                </button>
              </form>

              {/* Quick Login Helper for Evaluation */}
              <div className="p-3 rounded bg-dark border border-secondary border-opacity-25 mt-2 mb-4">
                <div className="small text-warning fw-bold mb-2">
                  <i className="bi bi-lightning-charge-fill me-1"></i> TÀI KHOẢN MẪU ĐỂ TEST NHANH:
                </div>
                <div className="d-flex flex-column gap-1 small">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('admin', 'adminpassword123')}
                    className="btn btn-sm btn-outline-warning text-start py-1"
                  >
                    👑 <strong>Admin</strong>: admin / adminpassword123
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('buyer01', 'userpass123')}
                    className="btn btn-sm btn-outline-success text-start py-1"
                  >
                    👤 <strong>User (Active)</strong>: buyer01 / userpass123
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('buyer02', 'userpass456')}
                    className="btn btn-sm btn-outline-danger text-start py-1"
                    title="Tài khoản bị khóa để kiểm tra thông báo lỗi"
                  >
                    🔒 <strong>User (Inactive - Khóa)</strong>: buyer02 / userpass456
                  </button>
                </div>
              </div>

              {/* Footer link to Register */}
              <div className="text-center pt-3 border-top border-secondary border-opacity-25 small text-secondary">
                Chưa có tài khoản?{' '}
                <Link to="/register" className="text-neon fw-bold text-decoration-none">
                  Đăng ký tài khoản mới ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
