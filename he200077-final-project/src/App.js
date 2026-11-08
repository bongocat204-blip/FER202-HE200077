import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MarqueeBanner from './components/MarqueeBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { normalizeGameKey } from './services/api';

// Pages
import Home from './pages/Home';
import AccountDetail from './pages/AccountDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import AdminDashboard from './pages/AdminDashboard';
import RandomAccount from './pages/RandomAccount';

// Backward compatibility redirect from /game/:gameCode to /Home/:gameId
const LegacyGameRedirect = () => {
  const { gameCode } = useParams();
  const gameId = normalizeGameKey(gameCode);
  return <Navigate to={`/Home/${gameId}`} replace />;
};

// 404 Not Found Component
const NotFound = () => (
  <div className="container py-5 text-center my-5">
    <div className="card card-tactical max-w-500 mx-auto p-5 border-secondary">
      <div className="text-neon mb-3 font-heading" style={{ fontSize: '5rem' }}>
        404
      </div>
      <h3 className="text-white fw-bold mb-2 font-heading">TRANG KHÔNG TỒN TẠI</h3>
      <p className="text-secondary mb-4">
        Đường dẫn bạn yêu cầu không tồn tại hoặc đã được di chuyển.
      </p>
      <Link to="/Home" className="btn btn-tactical">
        <i className="bi bi-house-door me-2"></i> Quay Lại Trang Chủ
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container d-flex flex-column min-vh-100">
          {/* Top Marquee Announcement Ticker */}
          <MarqueeBanner />

          {/* Navigation Bar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-grow-1">
            <Routes>
              {/* Default Route: Redirects to /Home */}
              <Route path="/" element={<Navigate to="/Home" replace />} />

              {/* Main Home & Game Filter Routes */}
              <Route path="/Home" element={<Home />} />
              <Route path="/Home/:gameId" element={<Home />} />

              {/* Legacy route compatibility */}
              <Route path="/game/:gameCode" element={<LegacyGameRedirect />} />

              {/* Account Detail Route */}
              <Route path="/account/:gameCode/:id" element={<AccountDetail />} />

              {/* Random Blind Box */}
              <Route path="/random" element={<RandomAccount />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected User History Route */}
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Approval & Management Route (Admin Only) */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Fallback 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Tactical Gaming Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
