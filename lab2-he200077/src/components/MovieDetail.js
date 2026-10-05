import React from "react";

export default function MovieDetail({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="movie-detail-modal">
      <div className="modal-content">
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
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}
