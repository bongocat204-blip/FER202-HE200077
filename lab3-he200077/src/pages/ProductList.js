import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductItem from "../components/ProductItem";
import Pagination from "../components/Pagination";

export default function ProductList({ products }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const PRODUCTS_PER_PAGE = 3;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  let filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" ? true : product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const indexOfLastItem = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div className="product-list-page">
      {/* 1. Dòng tìm kiếm và các bộ lọc */}
      <div className="filter-row">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* 2. Dòng Thống kê & Phân trang */}
      <div className="stats-pagination-row">
        <div className="stats">
          Tong:{filteredProducts.length}| Trang: {currentPage}/{totalPages || 1}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* 3. Bảng dữ liệu sản phẩm */}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Không tìm thấy sản phẩm.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
