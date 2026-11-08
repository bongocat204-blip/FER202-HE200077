import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/Home');
  };

  const displayName = user?.fullName || user?.username || 'Gamer';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-tactical sticky-top">
      <div className="container">
        {/* Brand Logo with Tactical Gaming Badge */}
        <Link className="navbar-brand py-2" to="/Home">
          <div className="brand-badge">
            <i className="bi bi-crosshair text-neon"></i>
            <span>TACTICAL</span>
          </div>
          <span className="fw-bolder">
            BonggoShop<span className="text-neon">.skin</span>
          </span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#tacticalNav"
          aria-controls="tacticalNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse" id="tacticalNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-1">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link nav-link-tactical ${isActive ? 'active' : ''}`
                }
                to="/Home"
                end
              >
                <i className="bi bi-house-door me-1"></i> Home
              </NavLink>
            </li>

            {/* Buy Skin / Accounts Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-link-tactical dropdown-toggle"
                href="#categories"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-shield-shaded me-1"></i> Buy Skin / Accounts
              </a>
              <ul className="dropdown-menu dropdown-menu-tactical">
                <li>
                  <Link className="dropdown-item dropdown-item-tactical" to="/Home/g_lol">
                    <span className="badge badge-game me-2">LOL</span> League of Legends (45 Acc)
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item dropdown-item-tactical" to="/Home/g_tft">
                    <span className="badge badge-game me-2">TFT</span> Đấu Trường Chân Lý (30 Acc)
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item dropdown-item-tactical" to="/Home/g_delta">
                    <span className="badge badge-game me-2">DELTA</span> Delta Force Tactical (35 Acc)
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item dropdown-item-tactical" to="/Home/g_lq">
                    <span className="badge badge-game me-2">LQMB</span> Liên Quân Mobile (25 Acc)
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link nav-link-tactical" to="/history">
                <i className="bi bi-clock-history me-1"></i> History
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link nav-link-tactical" to="/random">
                <i className="bi bi-dice-5 me-1 text-neon-cyan"></i> Random
              </NavLink>
            </li>

            {/* Admin Dashboard shortcut if admin */}
            {isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link nav-link-tactical text-warning" to="/admin">
                  <i className="bi bi-speedometer2 me-1"></i> Admin Portal
                </NavLink>
              </li>
            )}
          </ul>

          {/* Right Side Action Area */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-3">
                {/* User Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-tactical-secondary dropdown-toggle d-flex align-items-center gap-2 py-1 px-3"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center text-black fw-bold"
                      style={{
                        width: '28px',
                        height: '28px',
                        backgroundColor: isAdmin ? '#FFB800' : '#00FF87',
                        fontSize: '0.85rem'
                      }}
                    >
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-light fw-semibold">
                      Welcome, <span className="text-neon">{displayName}</span>
                    </span>
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-tactical">
                    <li className="px-3 py-2 border-bottom border-secondary mb-1">
                      <div className="small text-tactical-muted">Đăng nhập với tư cách:</div>
                      <div className="d-flex align-items-center justify-content-between mt-1">
                        <span className="fw-bold text-white">{user.username}</span>
                        <span
                          className={`badge ${
                            isAdmin ? 'bg-warning text-dark' : 'bg-success text-white'
                          }`}
                        >
                          Role: {user.role}
                        </span>
                      </div>
                      <div className="small text-muted mt-1">{user.email}</div>
                    </li>

                    <li>
                      <Link className="dropdown-item dropdown-item-tactical" to="/history">
                        <i className="bi bi-bag-check me-2 text-neon"></i> Lịch Sử Mua Acc
                      </Link>
                    </li>

                    {isAdmin && (
                      <li>
                        <Link className="dropdown-item dropdown-item-tactical text-warning" to="/admin">
                          <i className="bi bi-gear-fill me-2"></i> Quản Trị & Duyệt Đơn
                        </Link>
                      </li>
                    )}

                    <li>
                      <hr className="dropdown-divider dropdown-divider-tactical" />
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item dropdown-item-tactical text-danger"
                      >
                        <i className="bi bi-box-arrow-right me-2"></i> Đăng Xuất
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Direct Logout Button */}
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-tactical-danger d-none d-md-inline-flex align-items-center gap-1"
                  title="Đăng xuất"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="btn btn-tactical-outline">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Login
                </Link>
                <Link to="/register" className="btn btn-tactical">
                  <i className="bi bi-person-plus me-1"></i> Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
