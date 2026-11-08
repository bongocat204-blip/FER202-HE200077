import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const { username, email, fullName, password, confirmPassword } = formData;

    // Basic Validation
    if (!username.trim() || !email.trim() || !fullName.trim() || !password) {
      setErrorMessage('Vui lòng điền đầy đủ tất cả các trường.');
      return;
    }

    if (username.length < 3) {
      setErrorMessage('Tên đăng nhập phải có ít nhất 3 ký tự.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Mật khẩu phải có độ dài từ 6 ký tự trở lên.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      setLoading(true);
      await register({
        username,
        email,
        fullName,
        password
      });

      setSuccessMessage('Đăng ký tài khoản thành công! Đang chuyển hướng về trang chủ...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error('Registration failed:', err);
      setErrorMessage(err.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-6">
            <div className="card card-tactical p-4 p-md-5">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="brand-badge mb-2 d-inline-flex">
                  <i className="bi bi-person-plus-fill text-neon"></i>
                  <span>TACTICAL RECRUIT</span>
                </div>
                <h2 className="text-white fw-bold font-heading">ĐĂNG KÝ TÀI KHOẢN</h2>
                <p className="text-secondary small">
                  Tạo tài khoản BonggoShop.skin để mua, thuê và quản lý tài khoản game tự động.
                </p>
              </div>

              {/* Success Alert */}
              {successMessage && (
                <div className="alert alert-tactical alert-tactical-success p-3 mb-4 d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill fs-4 text-neon"></i>
                  <div className="small fw-semibold">{successMessage}</div>
                </div>
              )}

              {/* Error Alert */}
              {errorMessage && (
                <div className="alert alert-tactical alert-tactical-danger p-3 mb-4 d-flex align-items-center gap-2">
                  <i className="bi bi-shield-x fs-4"></i>
                  <div className="small fw-semibold">{errorMessage}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label small text-tactical-muted font-tactical fw-bold">
                    HỌ VÀ TÊN (FULL NAME)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary text-secondary">
                      <i className="bi bi-person-badge-fill text-neon"></i>
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control form-control-tactical"
                      placeholder="Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="mb-3">
                  <label className="form-label small text-tactical-muted font-tactical fw-bold">
                    TÊN ĐĂNG NHẬP (USERNAME)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary text-secondary">
                      <i className="bi bi-person-fill text-neon"></i>
                    </span>
                    <input
                      type="text"
                      name="username"
                      className="form-control form-control-tactical"
                      placeholder="gamer2026"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label small text-tactical-muted font-tactical fw-bold">
                    EMAIL
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-secondary text-secondary">
                      <i className="bi bi-envelope-fill text-neon"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-tactical"
                      placeholder="gamer@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password & Confirm */}
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label small text-tactical-muted font-tactical fw-bold">
                      MẬT KHẨU
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark border-secondary text-secondary">
                        <i className="bi bi-lock-fill text-neon"></i>
                      </span>
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-tactical"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small text-tactical-muted font-tactical fw-bold">
                      XÁC NHẬN MẬT KHẨU
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-dark border-secondary text-secondary">
                        <i className="bi bi-check2-circle text-neon"></i>
                      </span>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control form-control-tactical"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Terms Note */}
                <div className="small text-secondary mb-4">
                  <i className="bi bi-shield-check text-neon me-1"></i>
                  Tài khoản đăng ký mới sẽ mặc định có vai trò <strong>User</strong> và trạng thái{' '}
                  <strong className="text-neon">Active</strong>, lưu trữ trực tiếp vào cơ sở dữ liệu.
                </div>

                <button
                  type="submit"
                  className="btn btn-tactical w-100 py-3 mb-3 fw-bold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span> ĐANG TẠO TÀI KHOẢN...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-check-fill me-2"></i> HOÀN TẤT ĐĂNG KÝ
                    </>
                  )}
                </button>
              </form>

              <div className="text-center pt-3 border-top border-secondary border-opacity-25 small text-secondary">
                Đã có tài khoản?{' '}
                <Link to="/login" className="text-neon fw-bold text-decoration-none">
                  Đăng nhập tại đây
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
