import React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

export default function MovieItem({
  movie,
  isFavorite,
  onToggleFavorite,
  onSelectMovie,
}) {
  return (
    <div className="movie-item">
      <div className="movie-main-info">
        <span className="movie-title">
          {isFavorite ? <FaStar /> : <CiStar />}
          {movie.title}
        </span>
        <span className="movie-genre">{movie.genre}</span>
        <span className="movie-year-rating">
          {movie.year} | ⭐{movie.rating}
        </span>
      </div>

      <div className="movie-actions">
        <button onClick={() => onToggleFavorite(movie.id)}>
          [{isFavorite ? "Bỏ thích" : "Yêu thích"}]
        </button>
        <button onClick={() => onSelectMovie(movie)}>[chi tiết]</button>
      </div>
    </div>
  );
}
