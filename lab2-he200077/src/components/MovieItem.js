import React from "react";
import { Link } from "react-router-dom";

export default function MovieItem({ movie, isFavorite, onToggleFavorite }) {
  return (
    <div className="movie-item">
      <div className="movie-main-info">
        <span className="movie-title">
          {isFavorite ? "⭐" : "⭐"}
          {movie.title}
        </span>
        <span className="movie-genre">{movie.genre}</span>
        <span className="movie-year-rating">
          {movie.year} | ⭐{movie.rating}
        </span>
      </div>

      <div className="movie-actions">
        <button onClick={() => onToggleFavorite(movie.id)}>
          [{isFavorite ? "bỏ thích" : "Yêu thích"}]
        </button>
        {/* Chuyển hướng tới trang /detail/:id */}
        <Link to={`/detail/${movie.id}`} className="detail-link">
          [chi tiết]
        </Link>
      </div>
    </div>
  );
}
