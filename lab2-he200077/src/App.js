import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { movies as initialMovies } from "./datas/movies";

export default function App() {
  const [movies] = useState(initialMovies);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  // Thống kê
  const totalCount = movies.length;
  const favoriteCount = favorites.length;
  const displayedCount = filteredMovies.length;

  return (
    <div className="app-container">
      <Header />

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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

      <MovieList
        movies={filteredMovies}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onSelectMovie={setSelectedMovie}
      />

      <MovieDetail
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}
