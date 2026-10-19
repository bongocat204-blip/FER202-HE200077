import React from "react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Tìm tên sản phẩm........"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}
