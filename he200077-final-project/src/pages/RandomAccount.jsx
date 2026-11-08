import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAccounts, formatVND } from '../services/api';

const RandomAccount = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState('LOL');
  const [allAccounts, setAllAccounts] = useState({ LOL: [], TFT: [], DELTA: [], LQMB: [] });
  const [rolling, setRolling] = useState(false);
  const [randomResult, setRandomResult] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getAllAccounts();
      setAllAccounts(data);
    };
    load();
  }, []);

  const handleRoll = () => {
    const list = (allAccounts[selectedGame] || []).filter((a) => a.status === 'Available');
    if (list.length === 0) {
      alert(`Hiện tại không có tài khoản ${selectedGame} nào sẵn sàng trong kho.`);
      return;
    }

    setRolling(true);
    setRandomResult(null);

    // Roll animation effect
    let count = 0;
    const interval = setInterval(() => {
      const temp = list[Math.floor(Math.random() * list.length)];
      setRandomResult(temp);
      count++;
      if (count > 15) {
        clearInterval(interval);
        setRolling(false);
      }
    }, 100);
  };

  return (
    <div className="random-page py-5">
      <div className="container">
        <div className="text-center max-w-700 mx-auto mb-5">
          <div className="brand-badge mb-2 d-inline-flex">
            <i className="bi bi-dice-5-fill text-neon"></i>
            <span>LUCKY BLIND BOX</span>
          </div>
          <h1 className="text-white fw-bold font-heading">VÒNG QUAY RANDOM ACC</h1>
          <p className="text-secondary">
            Thử vận may của bạn! Chọn tựa game yêu thích và quay số để hệ thống đề xuất ngẫu nhiên tài khoản cực phẩm với giá hời nhất.
          </p>

          {/* Game Selector */}
          <div className="d-flex justify-content-center gap-2 mb-4">
            {['LOL', 'TFT', 'DELTA', 'LQMB'].map((code) => (
              <button
                key={code}
                onClick={() => {
                  setSelectedGame(code);
                  setRandomResult(null);
                }}
                className={`btn ${selectedGame === code ? 'btn-tactical' : 'btn-tactical-secondary'}`}
              >
                {code}
              </button>
            ))}
          </div>

          <button
            onClick={handleRoll}
            disabled={rolling}
            className="btn btn-lg btn-tactical-cyan px-5 py-3 fw-bold font-heading fs-5"
          >
            {rolling ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span> ĐANG QUAY NGẪU NHIÊN...
              </>
            ) : (
              <>
                <i className="bi bi-dice-5 me-2"></i> QUAY TÀI KHOẢN NGẪU NHIÊN
              </>
            )}
          </button>
        </div>

        {/* Result Showcase */}
        {randomResult && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div
                className={`card card-tactical p-4 text-center border-${
                  rolling ? 'secondary' : 'success'
                }`}
                style={{
                  backgroundColor: '#111827',
                  boxShadow: rolling ? 'none' : '0 0 30px rgba(0, 255, 135, 0.3)'
                }}
              >
                <div className="mb-2">
                  <span className="badge badge-game me-2">{selectedGame}</span>
                  <span className="badge-rank">Rank: {randomResult.rank}</span>
                </div>

                <h3 className="text-white fw-bold mb-2 font-heading">{randomResult.title}</h3>
                <p className="text-secondary small mb-3">{randomResult.description}</p>

                <div className="p-3 bg-dark rounded border border-secondary border-opacity-25 mb-4">
                  <div className="small text-secondary font-tactical">GIÁ NIÊM YẾT</div>
                  <div className="fs-2 fw-bold text-neon">{formatVND(randomResult.price)}</div>
                </div>

                {!rolling && (
                  <div className="d-flex justify-content-center gap-3">
                    <button
                      onClick={() => navigate(`/account/${selectedGame}/${randomResult.id}`)}
                      className="btn btn-tactical px-4"
                    >
                      <i className="bi bi-cart-check me-2"></i> Mua Ngay Tài Khoản Này
                    </button>
                    <button onClick={handleRoll} className="btn btn-tactical-secondary px-4">
                      <i className="bi bi-arrow-clockwise me-1"></i> Quay Lại
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomAccount;
