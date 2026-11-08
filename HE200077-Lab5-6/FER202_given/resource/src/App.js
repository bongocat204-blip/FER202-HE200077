import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SyllabusList from "./components/SyllabusList";
import SubjectDetail from "./components/SubjectDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/syllabus" element={<SyllabusList />} />

      {/* Route xem chi tiết, sửa hoặc thêm mới (id có thể là 'new' hoặc mã id thật như 'sub_01') */}
      <Route path="/subject/:id" element={<SubjectDetail />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
