import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatVND, normalizeGameKey, GAME_METADATA } from '../services/api';

const AccountCard = ({ account, gameCode = 'LOL', onQuickBuy }) => {
  const navigate = useNavigate();
  const gameKey = normalizeGameKey(gameCode);
  const meta = GAME_METADATA[gameKey] || GAME_METADATA.g_lol;
  const isAvailable = account.status === 'Available';

  const handleDetailsClick = () => {
    navigate(`/account/${gameKey}/${account.id}`);
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card card-tactical h-100">
        {/* Card Header Visual HUD */}
        <div
          className="p-3 position-relative d-flex justify-content-between align-items-center"
          style={{
            background: `linear-gradient(135deg, ${meta.color}25 0%, rgba(11, 15, 23, 0.95) 100%)`,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <span
              className="badge px-2 py-1 fw-bold"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: meta.color,
                border: `1px solid ${meta.color}`
              }}
            >
              <i className={`bi ${meta.icon} me-1`}></i>
              {meta.badge}
            </span>
            <span className="badge-rank">
              <i className="bi bi-shield-fill-check me-1"></i>
              {account.rank || 'Unranked'}
            </span>
          </div>

          <div>
            <span className={`badge-status ${isAvailable ? 'available' : 'sold'}`}>
              <i className={`bi ${isAvailable ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} me-1`}></i>
              {isAvailable ? 'SẴN SÀNG' : 'ĐÃ BÁN'}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body p-3 d-flex flex-column">
          <div className="small text-muted mb-1 font-monospace">#{account.id}</div>
          <h5
            className="card-title text-light fw-bold mb-2 text-truncate"
            title={account.title}
            style={{ fontSize: '1.05rem', cursor: 'pointer' }}
            onClick={handleDetailsClick}
          >
            {account.title}
          </h5>

          {/* Quick Specifications */}
          <div className="row g-2 mb-3 mt-1 py-2 px-1 bg-dark bg-opacity-50 rounded border border-secondary border-opacity-25 small">
            {account.skinsCount !== undefined && (
              <div className="col-6 d-flex align-items-center gap-1 text-light">
                <i className="bi bi-palette text-neon"></i>
                <span className="text-secondary">Trang phục:</span>
                <span className="fw-bold text-white ms-auto">{account.skinsCount}</span>
              </div>
            )}
            {account.championsCount !== undefined && (
              <div className="col-6 d-flex align-items-center gap-1 text-light">
                <i className="bi bi-people text-info"></i>
                <span className="text-secondary">Tướng:</span>
                <span className="fw-bold text-white ms-auto">{account.championsCount}</span>
              </div>
            )}
            {account.chibiCount !== undefined && (
              <div className="col-6 d-flex align-items-center gap-1 text-light">
                <i className="bi bi-stars text-warning"></i>
                <span className="text-secondary">Linh Thú:</span>
                <span className="fw-bold text-white ms-auto">{account.chibiCount}</span>
              </div>
            )}
            {(meta.code === 'DELTA' || account.rank?.includes('Colonel') || account.rank?.includes('General')) && (
              <div className="col-12 d-flex align-items-center gap-1 text-light">
                <i className="bi bi-gun text-danger"></i>
                <span className="text-secondary">Quân Hàm:</span>
                <span className="fw-bold text-white ms-auto">{account.rank}</span>
              </div>
            )}
          </div>

          <p
            className="card-text text-tactical-muted small mb-3 flex-grow-1"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {account.description || 'Tài khoản sạch, bảo hành an toàn trọn đời, hỗ trợ chuyển quyền sở hữu.'}
          </p>

          {/* Price & Action Area */}
          <div className="pt-2 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
            <div>
              <div className="small text-secondary" style={{ fontSize: '0.75rem' }}>GIÁ BÁN</div>
              <div className="fw-bold text-neon fs-5">
                {formatVND(account.price)}
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                onClick={handleDetailsClick}
                className="btn btn-sm btn-tactical-outline"
                title="Xem chi tiết"
              >
                Chi Tiết
              </button>
              {isAvailable ? (
                <button
                  onClick={() => onQuickBuy ? onQuickBuy(account, gameKey) : handleDetailsClick()}
                  className="btn btn-sm btn-tactical"
                >
                  <i className="bi bi-cart-check-fill me-1"></i> Mua
                </button>
              ) : (
                <button className="btn btn-sm btn-secondary disabled" disabled>
                  Đã Bán
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
