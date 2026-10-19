import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail-container">
        <p>Không tìm thấy thông tin sản phẩm!</p>
        <button onClick={() => navigate("/products")}>
          [Quay lại danh sách]
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <h3>Chi tiết sản phẩm #{product.id}</h3>
      <p>
        <strong>Tên sản phẩm:</strong> {product.name}
      </p>
      <p>
        <strong>Danh mục:</strong> {product.category}
      </p>
      <p>
        <strong>Giá bán:</strong> {product.price.toLocaleString("vi-VN")} VNĐ
      </p>
      <p>
        <strong>Mô tả:</strong> {product.description}
      </p>
      <br />
      <button onClick={() => navigate("/products")}>
        [Quay lại danh sách]
      </button>
    </div>
  );
}
