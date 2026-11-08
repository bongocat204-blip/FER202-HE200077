import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SubjectDetail() {
  const { id } = useParams(); // Nếu id === 'new' thì là Thêm mới, ngược lại là Xem/Sửa
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [subject, setSubject] = useState({
    code: '',
    name: '',
    curriculum: 'Software Engineering 2024',
    semester: 1,
    credits: 3,
    preRequisites: '',
    description: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Lấy user từ localStorage để phân quyền Lecturer / Student
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    } else {
      navigate('/login');
    }

    // Nếu không phải tạo mới (id !== 'new'), thì fetch dữ liệu môn học lên để xem/sửa
    if (id !== 'new') {
      fetch(`http://localhost:9999/subjects/${id}`)
        .then(res => res.json())
        .then(data => {
          setSubject({
            ...data,
            preRequisites: Array.isArray(data.preRequisites) ? data.preRequisites.join(', ') : data.preRequisites
          });
        })
        .catch(err => console.error(err));
    }
  }, [id, navigate]);

  // Kiểm tra quyền Lecturer
  const isLecturer = currentUser && currentUser.role && currentUser.role.toLowerCase() === 'lecturer';

  // Xử lý thay đổi input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý Lưu (Thêm mới hoặc Cập nhật)
  const handleSave = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Chuẩn hóa preRequisites thành mảng các chuỗi (ngăn cách bằng dấu phẩy)
    const formattedPreReqs = subject.preRequisites
      ? subject.preRequisites.split(',').map(item => item.trim()).filter(Boolean)
      : [];

    const payload = {
      ...subject,
      semester: Number(subject.semester),
      credits: Number(subject.credits),
      preRequisites: formattedPreReqs
    };

    if (id === 'new') {
      // POST: Thêm mới môn học
      fetch('http://localhost:9999/subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(() => {
          setSuccessMsg('Subject added successfully!');
          setTimeout(() => navigate('/syllabus'), 1200);
        })
        .catch(err => {
          console.error(err);
          setErrorMsg('Failed to add subject.');
        });
    } else {
      // PUT: Cập nhật môn học
      fetch(`http://localhost:9999/subjects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(() => {
          setSuccessMsg('Subject updated successfully!');
          setTimeout(() => navigate('/syllabus'), 1200);
        })
        .catch(err => {
          console.error(err);
          setErrorMsg('Failed to update subject.');
        });
    }
  };

  // Xử lý Xóa môn học
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      fetch(`http://localhost:9999/subjects/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          alert('Subject deleted successfully!');
          navigate('/syllabus');
        })
        .catch(err => {
          console.error(err);
          setErrorMsg('Failed to delete subject.');
        });
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">
          {id === 'new' ? 'Add New Subject' : isLecturer ? 'Edit Subject Details' : 'Subject Details'}
        </h3>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/syllabus')}>
          &larr; Back to Syllabus List
        </button>
      </div>

      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div className="card shadow-sm p-4">
        <form onSubmit={handleSave}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Subject Code</label>
              <input 
                type="text" 
                className="form-control" 
                name="code"
                value={subject.code}
                onChange={handleChange}
                disabled={!isLecturer && id !== 'new'}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Subject Name</label>
              <input 
                type="text" 
                className="form-control" 
                name="name"
                value={subject.name}
                onChange={handleChange}
                disabled={!isLecturer && id !== 'new'}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">Curriculum</label>
              <input 
                type="text" 
                className="form-control" 
                name="curriculum"
                value={subject.curriculum}
                onChange={handleChange}
                disabled={!isLecturer && id !== 'new'}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Semester</label>
              <input 
                type="number" 
                className="form-control" 
                name="semester"
                value={subject.semester}
                onChange={handleChange}
                disabled={!isLecturer && id !== 'new'}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">Credits</label>
              <input 
                type="number" 
                className="form-control" 
                name="credits"
                value={subject.credits}
                onChange={handleChange}
                disabled={!isLecturer && id !== 'new'}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Pre-requisites (comma separated codes)</label>
            <input 
              type="text" 
              className="form-control" 
              name="preRequisites"
              placeholder="e.g. PRF192, PRO192"
              value={subject.preRequisites}
              onChange={handleChange}
              disabled={!isLecturer && id !== 'new'}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Description</label>
            <textarea 
              className="form-control" 
              rows="3"
              name="description"
              value={subject.description}
              onChange={handleChange}
              disabled={!isLecturer && id !== 'new'}
            ></textarea>
          </div>

          {/* Cụm nút thao tác dành riêng cho Lecturer */}
          {isLecturer && (
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary px-4">
                {id === 'new' ? 'Create Subject' : 'Save Changes'}
              </button>

              {id !== 'new' && (
                <button type="button" className="btn btn-danger px-4" onClick={handleDelete}>
                  Delete Subject
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}