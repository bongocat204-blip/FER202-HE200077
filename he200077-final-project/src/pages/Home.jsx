import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AccountCard from '../components/AccountCard';
import CheckoutModal from '../components/CheckoutModal';
import { getAllAccounts, GAME_METADATA, normalizeGameKey } from '../services/api';

const CATEGORIES_LIST = [
  {
    id: 'g_lol',
    code: 'LOL',
    title: 'League of Legends (LMHT)',
    subtitle: '45 Tài Khoản Sẵn Có - Cao Thủ & Thách Đấu',
    icon: 'bi-gem',
    color: '#00E5FF'
  },
  {
    id: 'g_tft',
    code: 'TFT',
    title: 'Teamfight Tactics (ĐTCL)',
    subtitle: '30 Tài Khoản Sẵn Có - Chibi & Sàn Thần Thoại',
    icon: 'bi-puzzle-fill',
    color: '#FFB800'
  },
  {
    id: 'g_delta',
    code: 'DELTA',
    title: 'Delta Force Tactical',
    subtitle: '35 Tài Khoản Sẵn Có - Đại Tướng & Súng Cam',
    icon: 'bi-crosshair2',
    color: '#FF3366'
  },
  {
    id: 'g_lq',
    code: 'LQMB',
    title: 'Liên Quân Mobile',
    subtitle: '25 Tài Khoản Sẵn Có - Skin SSS & Chiến Tướng',
    icon: 'bi-lightning-charge-fill',
    color: '#9D00FF'
  }
];

const Home = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  // Selected game filter: null (All) or 'g_lol', 'g_tft', 'g_delta', 'g_lq'
  const activeGameKey = gameId ? normalizeGameKey(gameId) : null;
  const activeGameMeta = activeGameKey ? GAME_METADATA[activeGameKey] : null;

  const [accountsMap, setAccountsMap] = useState({ LOL: [], TFT: [], DELTA: [], LQMB: [] });
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('ALL'); // ALL, '<100k', '100k-1m', '>1m'
  const [selectedRank, setSelectedRank] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, 'Available', 'Sold'
  const [sortBy, setSortBy] = useState('DEFAULT'); // DEFAULT, 'PRICE_ASC', 'PRICE_DESC'

  // Checkout modal
  const [checkoutTarget, setCheckoutTarget] = useState(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const data = await getAllAccounts();
      setAccountsMap(data);
    } catch (err) {
      console.error('Error fetching accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // When gameId changes in URL, reset internal rank filter
  useEffect(() => {
    setSelectedRank('ALL');
  }, [gameId]);

  // Handle Category Click -> updates URL to /Home/:gameId or /Home
  const handleSelectCategory = (catId) => {
    if (!catId) {
      navigate('/Home');
    } else {
      navigate(`/Home/${catId}`);
    }
  };

  // Compile full account list or single category list
  const currentCategoryAccounts = useMemo(() => {
    if (activeGameKey && activeGameMeta) {
      const list = accountsMap[activeGameMeta.code] || [];
      return list.map((a) => ({ ...a, gameCode: activeGameMeta.code }));
    }

    // When on /Home without gameId, aggregate accounts from all games
    return [
      ...(accountsMap.LOL || []).map((a) => ({ ...a, gameCode: 'LOL' })),
      ...(accountsMap.TFT || []).map((a) => ({ ...a, gameCode: 'TFT' })),
      ...(accountsMap.DELTA || []).map((a) => ({ ...a, gameCode: 'DELTA' })),
      ...(accountsMap.LQMB || []).map((a) => ({ ...a, gameCode: 'LQMB' }))
    ];
  }, [activeGameKey, activeGameMeta, accountsMap]);

  // Extract distinct ranks for dynamic rank dropdown
  const availableRanks = useMemo(() => {
    const ranks = new Set();
    currentCategoryAccounts.forEach((acc) => {
      if (acc.rank) ranks.add(acc.rank);
    });
    return Array.from(ranks);
  }, [currentCategoryAccounts]);

  // Filtered & Sorted accounts
  const filteredAccounts = useMemo(() => {
    return currentCategoryAccounts
      .filter((acc) => {
        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = (acc.title || '').toLowerCase().includes(q);
          const matchDesc = (acc.description || '').toLowerCase().includes(q);
          const matchRank = (acc.rank || '').toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchRank) return false;
        }

        // Price range
        const price = acc.price || 0;
        if (priceRange === '<100k' && price >= 100000) return false;
        if (priceRange === '100k-1m' && (price < 100000 || price > 1000000)) return false;
        if (priceRange === '>1m' && price <= 1000000) return false;

        // Rank
        if (selectedRank !== 'ALL' && acc.rank !== selectedRank) return false;

        // Status
        if (statusFilter !== 'ALL' && acc.status !== statusFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'PRICE_ASC') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'PRICE_DESC') return (b.price || 0) - (a.price || 0);
        return 0;
      });
  }, [currentCategoryAccounts, searchQuery, priceRange, selectedRank, statusFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setPriceRange('ALL');
    setSelectedRank('ALL');
    setStatusFilter('ALL');
    setSortBy('DEFAULT');
  };

  const handleQuickBuy = (acc, code) => {
    setCheckoutTarget({ account: acc, gameCode: code });
  };

  return (
    <div className="home-page pb-5">
      {/* 1. HERO SECTION (Displayed on Main Home / When no gameId or as header) */}
      {!activeGameKey && (
        <section className="hero-section text-center position-relative">
          <div className="hero-glow-blob"></div>
          <div className="container position-relative" style={{ zIndex: 1 }}>
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3 border border-secondary border-opacity-50 bg-dark bg-opacity-75">
              <span className="badge bg-success rounded-pill px-2 py-1">SHOP GAME 2026</span>
              <span className="small text-light font-tactical">
                <i className="bi bi-shield-shaded text-neon me-1"></i> THANH TOÁN QR TPBANK - DUYỆT TỰ ĐỘNG
              </span>
            </div>

            <h1 className="hero-title text-uppercase">
              COLLECT WHAT <span className="text-neon glow-text">OTHERS CAN'T</span>
            </h1>

            <p className="hero-subtitle">
              Sở hữu ngay những tài khoản game đỉnh cao với thứ hạng Thách Đấu, Đại Tướng, Chiến Tướng và full skin siêu phẩm. Mua bán nhanh chóng, bảo mật tuyệt đối, bảo hành vĩnh viễn!
            </p>

            {/* Quick Metrics */}
            <div className="row g-3 justify-content-center max-w-900 mx-auto mb-4">
              <div className="col-6 col-md-3">
                <div className="stat-box">
                  <div className="stat-number">{accountsMap.LOL?.length || 45}</div>
                  <div className="stat-label">Acc LOL Có Sẵn</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-box">
                  <div className="stat-number">{accountsMap.TFT?.length || 30}</div>
                  <div className="stat-label">Acc TFT Sẵn Kho</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-box">
                  <div className="stat-number">{accountsMap.DELTA?.length || 35}</div>
                  <div className="stat-label">Acc Delta Force</div>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-box">
                  <div className="stat-number">{accountsMap.LQMB?.length || 25}</div>
                  <div className="stat-label">Acc Liên Quân</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. GAME CATEGORY SELECTOR CARDS */}
      <section id="categories" className="py-4">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-3 border-bottom border-secondary border-opacity-25 pb-2">
            <div>
              <div className="small text-neon text-uppercase font-tactical fw-bold">
                <i className="bi bi-controller me-1"></i> DANH MỤC TRÒ CHƠI
              </div>
              <h3 className="text-white fw-bold mb-0">CHỌN TỰA GAME BẠN MUỐN MUA ACC</h3>
            </div>
            <div className="text-secondary small mt-2 mt-md-0">
              Nhấp vào game để xem kho tài khoản độc quyền (URL: <code>/Home/:gameId</code>)
            </div>
          </div>

          <div className="row g-3 mb-4">
            {CATEGORIES_LIST.map((cat) => {
              const isSelected = activeGameKey === cat.id;
              const count =
                cat.id === 'g_lol'
                  ? accountsMap.LOL?.length || 45
                  : cat.id === 'g_tft'
                  ? accountsMap.TFT?.length || 30
                  : cat.id === 'g_delta'
                  ? accountsMap.DELTA?.length || 35
                  : accountsMap.LQMB?.length || 25;

              return (
                <div key={cat.id} className="col-12 col-sm-6 col-lg-3">
                  <div
                    className={`card card-tactical h-100 p-3 cursor-pointer ${
                      isSelected ? 'border-success shadow-lg' : ''
                    }`}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#162232' : 'var(--bg-card)'
                    }}
                    onClick={() => handleSelectCategory(cat.id)}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div
                        className="rounded-3 p-2 d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: `${cat.color}20`,
                          border: `1px solid ${cat.color}`,
                          color: cat.color,
                          width: '46px',
                          height: '46px'
                        }}
                      >
                        <i className={`bi ${cat.icon} fs-4`}></i>
                      </div>
                      <span className="badge bg-dark border border-secondary text-neon font-tactical px-2 py-1">
                        {count} ACC
                      </span>
                    </div>

                    <h5 className="text-white fw-bold mb-1 font-heading">{cat.code}</h5>
                    <div className="small text-secondary mb-2">{cat.title}</div>

                    <div className="pt-2 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
                      <span className={`small fw-bold ${isSelected ? 'text-neon' : 'text-neon-cyan'}`}>
                        {isSelected ? 'Đang Lọc' : 'Xem Kho Acc'}
                      </span>
                      <i className={`bi ${isSelected ? 'bi-check-circle-fill text-neon' : 'bi-arrow-right text-secondary'}`}></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TACTICAL FILTER HUD & DYNAMIC URL SWITCHER */}
      <section className="py-2">
        <div className="container">
          <div className="card card-tactical p-4 mb-4">
            {/* Top row: Category Tabs */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3 pb-3 border-bottom border-secondary border-opacity-25">
              <div className="d-flex flex-wrap align-items-center gap-2">
                <span className="small text-secondary font-tactical fw-bold me-1">TỰA GAME:</span>
                <button
                  onClick={() => handleSelectCategory(null)}
                  className={`btn btn-sm ${!activeGameKey ? 'btn-tactical' : 'btn-tactical-secondary'}`}
                >
                  <i className="bi bi-grid-fill me-1"></i> TẤT CẢ GAME ({currentCategoryAccounts.length})
                </button>
                {CATEGORIES_LIST.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCategory(c.id)}
                    className={`btn btn-sm ${activeGameKey === c.id ? 'btn-tactical' : 'btn-tactical-secondary'}`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>

              {activeGameMeta && (
                <div className="badge badge-game fs-6">
                  Đang lọc theo: <strong className="text-white">{activeGameMeta.name}</strong>
                </div>
              )}
            </div>

            {/* Filter Controls Row */}
            <div className="row g-3 align-items-center">
              {/* Search input */}
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

              {/* Price filter */}
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

              {/* Rank filter */}
              <div className="col-6 col-md-2">
                <label className="form-label small text-tactical-muted fw-bold font-tactical">
                  <i className="bi bi-award-fill me-1 text-warning"></i> RANK
                </label>
                <select
                  className="form-select form-select-tactical"
                  value={selectedRank}
                  onChange={(e) => setSelectedRank(e.target.value)}
                >
                  <option value="ALL">Tất cả Rank</option>
                  {availableRanks.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status filter */}
              <div className="col-6 col-md-2">
                <label className="form-label small text-tactical-muted fw-bold font-tactical">
                  <i className="bi bi-tag-fill me-1 text-neon"></i> TRẠNG THÁI
                </label>
                <select
                  className="form-select form-select-tactical"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ALL">Tất cả</option>
                  <option value="Available">Sẵn sàng (Chưa bán)</option>
                  <option value="Sold">Đã bán</option>
                </select>
              </div>

              {/* Sort by */}
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

            {/* Active Filters Clear Button */}
            {(searchQuery || priceRange !== 'ALL' || selectedRank !== 'ALL' || statusFilter !== 'ALL' || sortBy !== 'DEFAULT') && (
              <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top border-secondary border-opacity-25 small">
                <div className="text-secondary">
                  Tìm thấy <strong className="text-neon">{filteredAccounts.length}</strong> tài khoản phù hợp
                </div>
                <button
                  onClick={handleResetFilters}
                  className="btn btn-sm btn-link text-danger text-decoration-none p-0"
                >
                  <i className="bi bi-arrow-counterclockwise me-1"></i> Xóa bộ lọc
                </button>
              </div>
            )}
          </div>

          {/* 4. ACCOUNTS GRID SHOWCASE */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-white fw-bold mb-0 font-heading">
              {activeGameMeta ? (
                <>
                  KHO TÀI KHOẢN <span className="text-neon">{activeGameMeta.code}</span> ({filteredAccounts.length})
                </>
              ) : (
                <>
                  TẤT CẢ TÀI KHOẢN GAME SẴN CÓ ({filteredAccounts.length})
                </>
              )}
            </h4>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-neon mb-3" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </div>
              <p className="text-secondary font-tactical">Đang đồng bộ kho dữ liệu tài khoản...</p>
            </div>
          ) : filteredAccounts.length > 0 ? (
            <div className="row">
              {filteredAccounts.map((account) => (
                <AccountCard
                  key={`${account.gameCode}-${account.id}`}
                  account={account}
                  gameCode={account.gameCode}
                  onQuickBuy={handleQuickBuy}
                />
              ))}
            </div>
          ) : (
            <div className="card card-tactical text-center p-5 max-w-500 mx-auto my-4">
              <i className="bi bi-search fs-1 text-secondary mb-3"></i>
              <h5 className="text-white fw-bold">Không Tìm Thấy Tài Khoản Phù Hợp</h5>
              <p className="text-secondary small mb-3">
                Thử thay đổi mức giá hoặc từ khóa tìm kiếm.
              </p>
              <button onClick={handleResetFilters} className="btn btn-tactical mx-auto">
                Xóa Bộ Lọc
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CHECKOUT MODAL WITH TPBANK QR */}
      {checkoutTarget && (
        <CheckoutModal
          account={checkoutTarget.account}
          gameCode={checkoutTarget.gameCode}
          onClose={() => setCheckoutTarget(null)}
          onSuccess={() => {
            fetchAll();
          }}
        />
      )}
    </div>
  );
};

export default Home;
