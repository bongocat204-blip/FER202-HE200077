import React from "react";

export default function GenreFilter({
  genres,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="filter-bar">
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="all">Tất cả thể loại</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="default">Sắp xếp: Mặc Định</option>
        <option value="rating">Rating (Cao - Thấp)</option>
        <option value="year">Năm (Mới - Cũ)</option>
        <option value="title">Tên (A - Z)</option>
      </select>
    </div>
  );
}
