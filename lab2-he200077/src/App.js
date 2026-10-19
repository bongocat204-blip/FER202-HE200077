import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Pagination from "./components/Pagination"; // 👈 [THÊM MỚI]: Import Pagination
import { useLocalStorage } from "./hooks/useLocalStorage";
import { movies as initialMovies } from "./datas/movies";

export default function App() {
  const [movies] = useState(initialMovies);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // ================= [THÊM MỚI]: State Phân trang =================
  const [currentPage, setCurrentPage] = useState(1);
  const MOVIES_PER_PAGE = 4; // Cấu hình 4 phim 1 trang

  // ================= [THÊM MỚI]: Reset về trang 1 khi tìm kiếm / lọc =================
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre, sortBy]);

  // Thêm / Bỏ yêu thích
  const handleToggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Tạo danh sách thể loại unique
  const genres = Array.from(new Set(movies.map((m) => m.genre)));

  // Filter & Search
  let filteredMovies = movies.filter((movie) => {
    const matchesGenre =
      selectedGenre === "all" ? true : movie.genre === selectedGenre;
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  // Sort
  if (sortBy === "rating") {
    filteredMovies.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "year") {
    filteredMovies.sort((a, b) => b.year - a.year);
  } else if (sortBy === "title") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  }

  // ================= [THÊM MỚI]: Logic cắt mảng phim cho trang hiện tại =================
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
  const indexOfLastMovie = currentPage * MOVIES_PER_PAGE;
  const indexOfFirstMovie = indexOfLastMovie - MOVIES_PER_PAGE;
  // Mảng 4 phim hiển thị trên màn hình hiện tại:
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie,
  );

  // Thống kê
  const totalCount = movies.length;
  const favoriteCount = favorites.length;
  const displayedCount = filteredMovies.length;

  return (
    <div className="app-container">
      <Header />

      <Routes>
        {/* Trang danh sách chính (Route '/') */}
        <Route
          path="/"
          element={
            <>
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              <GenreFilter
                genres={genres}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              <div className="stats-bar">
                <span>Tổng: {totalCount}</span> |{" "}
                <span>Yêu thích: {favoriteCount}</span> |{" "}
                <span>Đang hiển thị: {displayedCount}</span>
              </div>

              {/* [SỬA ĐỔI]: Truyền currentMovies (4 phim) thay vì filteredMovies */}
              <MovieList
                movies={currentMovies}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />

              {/* [THÊM MỚI]: Thêm Component Phân trang ở dưới danh sách phim */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          }
        />

        {/* Trang chi tiết phim (Route '/detail/:id') */}
        <Route path="/detail/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}
