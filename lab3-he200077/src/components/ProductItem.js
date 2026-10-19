import React from "react";
import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price.toLocaleString("vi-VN")} đ</td>
      <td>
        <Link to={`/products/${product.id}`}>[chi tiet]</Link>
      </td>
    </tr>
  );
}
