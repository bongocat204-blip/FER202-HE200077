import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function SyllabusList() {
  const [subjects, setSubjects] = useState([]);
  const [searchBy, setSearchBy] = useState('code'); // 
  const [keyword, setKeyword] = useState('');
  const [appliedKeyword, setAppliedKeyword] = useState('');
  const [appliedSearchBy, setAppliedSearchBy] = useState('code');
  
  const navigate = useNavigate();

  // Lấy thông tin user đã đăng nhập từ localStorage
  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Guest', role: 'User' };

  // Fetch danh sách môn học từ json-server
  useEffect(() => {
    fetch('http://localhost:9000/subjects')
      .then(res => res.json())
      .then(data => setSubjects(data))
      .catch(err => console.error(err));
  }, []);

  // Xử lý Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Xử lý khi bấm nút Search
  const handleSearch = (e) => {
    e.preventDefault();
    setAppliedKeyword(keyword);
    setAppliedSearchBy(searchBy);
  };

  // Lọc dữ liệu theo từ khóa và kiểu tìm kiếm (Code hoặc Name)
  const filteredSubjects = subjects.filter(subject => {
    if (!appliedKeyword.trim()) return true;

    const term = appliedKeyword.toLowerCase();
    if (appliedSearchBy === 'code') {
      return subject.code && subject.code.toLowerCase().includes(term);
    } else {
      return subject.name && subject.name.toLowerCase().includes(term);
    }
  });

  return (
    <div>
      {/* 1. Navigation Bar & Header */}
      <nav className="navbar navbar-dark bg-primary px-4 mb-4">
        <span className="navbar-brand mb-0 h1 fw-bold">
          FPT education Learning Materials Portal
        </span>
        <div className="d-flex align-items-center gap-3 text-white">
          <span>Welcome, <strong>{user.fullName}</strong> ({user.role})</span>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container">
        <h3 className="mb-3 fw-bold">Syllabus List</h3>

        {/* 2. Search & Filter Bar */}
        <form onSubmit={handleSearch} className="row g-2 mb-4 align-items-center">
          <div className="col-md-3">
            <div className="input-group">
              <span className="input-group-text bg-light">Search by:</span>
              <select 
                className="form-select"
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option value="code">Code</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <input 
              type="text"
              className="form-control"
              placeholder={`Enter subject ${searchBy}...`}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <button type="submit" className="btn btn-primary px-4">
              Search
            </button>
          </div>
        </form>

        {/* 3. Subject Table */}
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover table-striped table-bordered align-middle mb-0">
            <thead className="table-primary">
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Curriculum</th>
                <th>Semester</th>
                <th>Credits</th>
                <th>Pre-requisites</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map(subject => (
                  <tr key={subject.id}>
                    <td>
                      {/* Click vào Code sẽ nhảy sang /subject/:id */}
                      <Link 
                        to={`/subject/${subject.id}`} 
                        className="fw-bold text-decoration-none text-primary"
                      >
                        {subject.code}
                      </Link>
                    </td>
                    <td>{subject.name}</td>
                    <td>{subject.curriculum}</td>
                    <td className="text-center">{subject.semester}</td>
                    <td className="text-center">{subject.credits}</td>
                    <td>
                      {Array.isArray(subject.preRequisites) && subject.preRequisites.length > 0
                        ? subject.preRequisites.join(', ')
                        : '-'}
                    </td>
                    <td>{subject.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-3">
                    No subjects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}