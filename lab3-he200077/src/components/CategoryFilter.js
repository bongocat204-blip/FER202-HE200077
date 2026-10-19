import React from "react";

export default function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}) {
  return (
    <>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">Tat ca danh muc</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="default">Sắp xếp: Mặc Định</option>
        <option value="price-asc">Giá (Thấp - Cao)</option>
        <option value="price-desc">Giá (Cao - Thấp)</option>
        <option value="name">Tên (A - Z)</option>
      </select>
    </>
  );
}
