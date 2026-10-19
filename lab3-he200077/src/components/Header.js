import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="logo">[ProductStore]</div>
      <nav className="nav-links">
        <Link to="/">[Home]</Link>
        <Link to="/products">[Product]</Link>
        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </nav>
    </header>
  );
}

/*1. Homepage (/)
|----------------------------------------------------------------------|
|  [ProductStore]                                   [Home][Product]    |
|----------------------------------------------------------------------|
|                    Welcome to productstore                           |
|           Manage.....                                                |
|               [{button} ViewProduct]                                 |
|----------------------------------------------------------------------|

2.Product List page (/products)
|----------------------------------------------------------------------|
|  [ProductStore]                                   [Home][Product]    |
|----------------------------------------------------------------------|
|[Tim ten san pham........][Tat ca danh muc{dropdown}][Sapxep:Mac Dinh]|
| Tong:15| Trang: 1/5          [Truoc][1][2][3][4][5][Sau]             |
|----------------------------------------------------------------------|
||ID|   Ten san pham    |Danh muc |Gia  |Thaotac                       |
||1 |                   |         |     |[chi tiet]                    |
|{chi hien thi 3 san pham 1 trang ghi ro comment cho nao dieu chinh hien thi max san pham 1 trang}\
-------------------------------------------------------------------------------------------------------

3.Product Detail Page (/products/:id)
Tuong tu nhu tren
4.Not found page (*)
Tuong tu nhu tren




*/
