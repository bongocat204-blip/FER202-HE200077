import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movies } from "../datas/movies";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tìm phim theo ID lấy từ URL
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return (
      <div className="movie-detail-container">
        <p>Không tìm thấy thông tin phim!</p>
        <button onClick={() => navigate("/")}>[Quay lại danh sách]</button>
      </div>
    );
  }

  return (
    <div className="movie-detail-container">
      <h3>
        {movie.title} ({movie.year})
      </h3>
      <p>
        <strong>Thể loại:</strong> {movie.genre}
      </p>
      <p>
        <strong>Đánh giá:</strong> ⭐ {movie.rating}/10
      </p>
      <p>
        <strong>Đạo diễn:</strong> {movie.director}
      </p>
      <p>
        <strong>Thời lượng:</strong> {movie.duration} phút
      </p>
      <p>
        <strong>Mô tả:</strong> {movie.description}
      </p>

      <br />
      <button onClick={() => navigate("/")}>[Quay lại trang chủ]</button>
    </div>
  );
}
