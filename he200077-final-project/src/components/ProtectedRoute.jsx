import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-neon" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user?.role !== 'Admin') {
    return (
      <div className="container py-5 text-center my-5">
        <div className="card card-tactical max-w-500 mx-auto p-5 border-danger shadow">
          <div className="text-danger mb-3">
            <i className="bi bi-shield-slash-fill" style={{ fontSize: '4rem' }}></i>
          </div>
          <h2 className="text-white fw-bold mb-2">TRUY CẬP BỊ TỪ CHỐI (403)</h2>
          <p className="text-secondary mb-4">
            Khu vực này chỉ dành riêng cho Quản trị viên (Admin). Bạn đang đăng nhập với tài khoản người dùng bình thường ({user.username}).
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/" className="btn btn-tactical">
              <i className="bi bi-house-door me-2"></i> Quay Lại Trang Chủ
            </Link>
            <Link to="/history" className="btn btn-tactical-outline">
              <i className="bi bi-bag-check me-2"></i> Xem Đơn Hàng Của Bạn
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
