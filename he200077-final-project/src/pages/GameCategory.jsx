import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import AccountCard from '../components/AccountCard';
import { getAccounts } from '../services/api';

const GAME_INFO = {
  LOL: {
    title: 'League of Legends (LMHT)',
    category: 'MOBA PC',
    publisher: 'Riot Games',
    badge: 'LOL',
    color: '#00E5FF',
    icon: 'bi-gem',
    description: 'Kho nick Liên Minh Huyền Thoại rank Thách Đấu, Cao Thủ, full tướng và sở hữu hàng trăm skin Tuyệt Phẩm, Siêu Phẩm, Hàng Hiệu.'
  },
  TFT: {
    title: 'Teamfight Tactics (ĐTCL)',
    category: 'Auto Battler',
    publisher: 'Riot Games',
    badge: 'TFT',
    color: '#FFB800',
    icon: 'bi-puzzle-fill',
    description: 'Kho acc Đấu Trường Chân Lý VIP với đầy đủ Linh Hồn Chibi hiếm, sàn đấu Thần Thoại và chưởng lực kết liễu độc quyền.'
  },
  DELTA: {
    title: 'Delta Force Tactical',
    category: 'FPS Quân Sự',
    publisher: 'Tencent / TiMi',
    badge: 'DELTA',
    color: '#FF3366',
    icon: 'bi-crosshair2',
    description: 'Kho tài khoản Delta Force rank General, Đại Tá, mở khóa toàn bộ vũ khí súng Cam M4A1 Rồng, AWM Gold và gói Pass độc quyền.'
  },
  LQMB: {
    title: 'Liên Quân Mobile (AOV)',
    category: 'MOBA Mobile',
    publisher: 'Garena',
    badge: 'LQMB',
    color: '#9D00FF',
    icon: 'bi-lightning-charge-fill',
    description: 'Acc Liên Quân Mobile rank Chiến Tướng 50-100 Sao, full tướng và sở hữu skin SSS Hữu Hạn Nakroth BGM, Raz Muay Thái, Tulen Thần Sứ.'
  }
};

const GameCategory = () => {
  const { gameCode } = useParams();
  const activeCode = (gameCode || 'LOL').toUpperCase();
  const gameMeta = GAME_INFO[activeCode] || GAME_INFO.LOL;

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('ALL'); // ALL, '<100k', '100k-1m', '>1m'
  const [selectedRank, setSelectedRank] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, 'Available', 'Sold'
  const [sortBy, setSortBy] = useState('DEFAULT'); // DEFAULT, 'PRICE_ASC', 'PRICE_DESC'

  // Fetch accounts when gameCode changes
  useEffect(() => {
    const fetchCategoryAccounts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAccounts(activeCode);
        setAccounts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load accounts for', activeCode, err);
        setError('Không thể kết nối đến máy chủ API (http://localhost:9999). Vui lòng kiểm tra JSON Server.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAccounts();
    // Reset filters on game switch
    setSearchQuery('');
    setPriceRange('ALL');
    setSelectedRank('ALL');
    setStatusFilter('ALL');
    setSortBy('DEFAULT');
  }, [activeCode]);

  // Extract distinct ranks for filter dropdown
  const availableRanks = useMemo(() => {
    const ranks = new Set();
    accounts.forEach((acc) => {
      if (acc.rank) ranks.add(acc.rank);
    });
    return Array.from(ranks);
  }, [accounts]);

  // Filtering & Sorting logic
  const filteredAccounts = useMemo(() => {
    return accounts
      .filter((acc) => {
        // Search query filter (title or description)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = (acc.title || '').toLowerCase().includes(q);
          const matchDesc = (acc.description || '').toLowerCase().includes(q);
          const matchRank = (acc.rank || '').toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchRank) return false;
        }

        // Price filter: < 100K, 100K - 1TR, > 1TR
        const price = acc.price || 0;
        if (priceRange === '<100k') {
          if (price >= 100000) return false;
        } else if (priceRange === '100k-1m') {
          if (price < 100000 || price > 1000000) return false;
        } else if (priceRange === '>1m') {
          if (price <= 1000000) return false;
        }

        // Rank filter
        if (selectedRank !== 'ALL' && acc.rank !== selectedRank) {
          return false;
        }

        // Status filter
        if (statusFilter !== 'ALL' && acc.status !== statusFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'PRICE_ASC') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'PRICE_DESC') return (b.price || 0) - (a.price || 0);
        return 0;
      });
  }, [accounts, searchQuery, priceRange, selectedRank, statusFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setPriceRange('ALL');
    setSelectedRank('ALL');
    setStatusFilter('ALL');
    setSortBy('DEFAULT');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    priceRange !== 'ALL' ||
    selectedRank !== 'ALL' ||
    statusFilter !== 'ALL' ||
    sortBy !== 'DEFAULT';

  return (
    <div className="game-category-page py-4">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-secondary text-decoration-none">
                <i className="bi bi-house-door me-1"></i> Trang Chủ
              </Link>
            </li>
            <li className="breadcrumb-item text-secondary">Danh Mục Game</li>
            <li className="breadcrumb-item active text-neon" aria-current="page">
              {gameMeta.title}
            </li>
          </ol>
        </nav>

        {/* Game Banner Header */}
        <div
          className="p-4 p-md-5 rounded-3 mb-4 position-relative overflow-hidden border border-secondary border-opacity-25"
          style={{
            backgroundColor: '#0F1622',
            backgroundImage: `radial-gradient(circle at 90% 20%, ${gameMeta.color}22 0%, transparent 60%)`
          }}
        >
          <div className="row align-items-center">
            <div className="col-12 col-lg-8">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span
                  className="badge px-2 py-1 fw-bold"
                  style={{ backgroundColor: `${gameMeta.color}25`, color: gameMeta.color, border: `1px solid ${gameMeta.color}` }}
                >
                  <i className={`bi ${gameMeta.icon} me-1`}></i> {gameMeta.badge}
                </span>
                <span className="badge bg-dark border border-secondary text-light">
                  {gameMeta.category}
                </span>
                <span className="badge bg-dark border border-secondary text-secondary">
                  NPH: {gameMeta.publisher}
                </span>
              </div>
              <h1 className="text-white fw-bolder mb-2 font-heading">{gameMeta.title}</h1>
              <p className="text-secondary mb-3 max-w-700">{gameMeta.description}</p>

              {/* Game switcher tabs */}
              <div className="d-flex flex-wrap gap-2 pt-2">
                {Object.keys(GAME_INFO).map((code) => (
                  <Link
                    key={code}
                    to={`/game/${code}`}
                    className={`btn btn-sm ${
                      code === activeCode ? 'btn-tactical' : 'btn-tactical-secondary'
                    }`}
                  >
                    {code}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-12 col-lg-4 mt-3 mt-lg-0 text-lg-end">
              <div className="stat-box d-inline-block text-start p-3 bg-dark bg-opacity-75">
                <div className="small text-secondary font-tactical">TỔNG TÀI KHOẢN TRONG KHO</div>
                <div className="fs-2 fw-bold text-neon">{accounts.length} NICK</div>
                <div className="small text-tactical-muted">
                  <span className="text-success fw-bold">
                    {accounts.filter((a) => a.status === 'Available').length}
                  </span>{' '}
                  Nick Sẵn Sàng Giao Dịch
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TACTICAL FILTER & SEARCH CONTROLS */}
        <div className="card card-tactical p-4 mb-4">
          <div className="row g-3 align-items-center">
            {/* Search Input */}
            <div className="col-12 col-md-4">
              <label className="form-label small text-tactical-muted fw-bold font-tactical">
                <i className="bi bi-search me-1 text-neon"></i> TÌM THEO TÊN HOẶC MÔ TẢ
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-tactical"
                  placeholder="Nhập tên skin, tướng, rank..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="btn btn-outline-secondary text-secondary"
                    onClick={() => setSearchQuery('')}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="col-6 col-md-2">
              <label className="form-label small text-tactical-muted fw-bold font-tactical">
                <i className="bi bi-cash-stack me-1 text-neon-cyan"></i> KHOẢNG GIÁ
              </label>
              <select
                className="form-select form-select-tactical"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="ALL">Tất cả mức giá</option>
                <option value="<100k">&lt; 100K</option>
                <option value="100k-1m">100K - 1 Triệu</option>
                <option value=">1m">&gt; 1 Triệu</option>
              </select>
            </div>

            {/* Rank Filter */}
            <div className="col-6 col-md-2">
              <label className="form-label small text-tactical-muted fw-bold font-tactical">
                <i className="bi bi-award-fill me-1 text-warning"></i> THỨ HẠNG (RANK)
              </label>
              <select
                className="form-select form-select-tactical"
                value={selectedRank}
                onChange={(e) => setSelectedRank(e.target.value)}
              >
                <option value="ALL">Tất cả Rank</option>
                {availableRanks.map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="col-6 col-md-2">
              <label className="form-label small text-tactical-muted fw-bold font-tactical">
                <i className="bi bi-tag-fill me-1 text-neon"></i> TRẠNG THÁI
              </label>
              <select
                className="form-select form-select-tactical"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">Tất cả trạng thái</option>
                <option value="Available">Chưa bán (Sẵn sàng)</option>
                <option value="Sold">Đã bán</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="col-6 col-md-2">
              <label className="form-label small text-tactical-muted fw-bold font-tactical">
                <i className="bi bi-sort-down me-1 text-info"></i> SẮP XẾP
              </label>
              <select
                className="form-select form-select-tactical"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="DEFAULT">Mặc định</option>
                <option value="PRICE_ASC">Giá: Thấp đến Cao</option>
                <option value="PRICE_DESC">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>

          {/* Active Filter Indicators & Reset Button */}
          {hasActiveFilters && (
            <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-3 border-top border-secondary border-opacity-25">
              <span className="small text-secondary">Đang áp dụng:</span>
              {searchQuery && (
                <span className="badge bg-dark border border-secondary text-light">
                  Từ khóa: "{searchQuery}"
                </span>
              )}
              {priceRange !== 'ALL' && (
                <span className="badge bg-dark border border-secondary text-neon-cyan">
                  Giá: {priceRange === '<100k' ? '< 100K' : priceRange === '100k-1m' ? '100K - 1TR' : '> 1TR'}
                </span>
              )}
              {selectedRank !== 'ALL' && (
                <span className="badge bg-dark border border-secondary text-warning">
                  Rank: {selectedRank}
                </span>
              )}
              {statusFilter !== 'ALL' && (
                <span className="badge bg-dark border border-secondary text-neon">
                  Trạng thái: {statusFilter === 'Available' ? 'Chưa bán' : 'Đã bán'}
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="btn btn-sm btn-link text-danger text-decoration-none p-0 ms-auto font-tactical"
              >
                <i className="bi bi-arrow-counterclockwise me-1"></i> Xóa bộ lọc
              </button>
            </div>
          )}
        </div>

        {/* RESULTS SUMMARY */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="small text-tactical-muted">
            Tìm thấy <strong className="text-neon">{filteredAccounts.length}</strong> tài khoản phù hợp
          </div>
        </div>

        {/* ERROR STATE */}
        {error && (
          <div className="alert alert-tactical alert-tactical-danger p-4 text-center my-4">
            <i className="bi bi-exclamation-triangle-fill fs-2 mb-2 d-block"></i>
            <h5>LỖI KẾT NỐI API</h5>
            <p className="mb-2">{error}</p>
            <div className="small text-secondary">
              Đảm bảo lệnh <code>npm run server</code> hoặc <code>json-server database.json -p 9999</code> đang chạy.
            </div>
          </div>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-neon mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary font-tactical">ĐANG TRUY XUẤT KHO DỮ LIỆU {activeCode}...</p>
          </div>
        )}

        {/* ACCOUNTS GRID */}
        {!loading && !error && (
          <div className="row">
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  gameCode={activeCode}
                />
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <div className="card card-tactical p-5 max-w-500 mx-auto">
                  <i className="bi bi-search fs-1 text-secondary mb-3"></i>
                  <h4 className="text-white fw-bold">Không Tìm Thấy Tài Khoản</h4>
                  <p className="text-secondary small mb-3">
                    Không có tài khoản nào phù hợp với bộ lọc hiện tại của bạn. Hãy thử thay đổi mức giá hoặc xóa từ khóa tìm kiếm.
                  </p>
                  <button onClick={handleResetFilters} className="btn btn-tactical mx-auto">
                    Xóa Toàn Bộ Bộ Lọc
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCategory;
