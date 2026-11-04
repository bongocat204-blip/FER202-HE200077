import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Fetch dữ liệu từ bảng accounts của json-server
    fetch('http://localhost:9000/accounts')
      .then(res => res.json())
      .then(accounts => {
        // Tìm tài khoản khớp email và password
        const foundUser = accounts.find(
          acc => acc.email === email && acc.password === password
        );

        if (!foundUser) {
          setErrorMsg('Invalid email or password.');
          return;
        }

        // Kiểm tra trạng thái tài khoản (Inactive)
        if (foundUser.status && foundUser.status.toLowerCase() === 'inactive') {
          setErrorMsg('Tài khoản bị khóa');
          return;
        }

        // Đăng nhập thành công: Lưu session vào localStorage
        localStorage.setItem('user', JSON.stringify(foundUser));

        // Chuyển hướng đến trang quản lý syllabus (/syllabus)
        navigate('/syllabus');
      })
      .catch(err => {
        console.error(err);
        setErrorMsg('An error occurred during authentication.');
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4 fw-bold">Sign In</h3>
        
        {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="email of student or lecture"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}