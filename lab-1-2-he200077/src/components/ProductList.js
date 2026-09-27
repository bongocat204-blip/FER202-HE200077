import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "./ProductCard";

// Import 8 hình ảnh từ thư mục ../data/ theo đúng cấu trúc dự án
import nam1 from "../data/nam1.jpg";
import nam2 from "../data/nam2.jpg";
import nam3 from "../data/nam3.jpg";
import nam4 from "../data/nam4.jpg";
import nu1 from "../data/Nu1.jpg";
import nu2 from "../data/Nu2.jpg";
import nu3 from "../data/Nu3.jpg";
import nu4 from "../data/nu4.jpg";

function ProductList() {
  const products = [
    { id: 1, title: "Áo Sơ Mi Nam Công Sở", price: "350.000 VNĐ", image: nam1 },
    {
      id: 2,
      title: "Áo Polo Nam Phong Cách",
      price: "280.000 VNĐ",
      image: nam2,
    },
    { id: 3, title: "Áo Thun Nam Casual", price: "220.000 VNĐ", image: nam3 },
    {
      id: 4,
      title: "Áo Khoác Nam Thời Trang",
      price: "550.000 VNĐ",
      image: nam4,
    },
    { id: 5, title: "Váy Nữ Dáng Xòe", price: "420.000 VNĐ", image: nu1 },
    { id: 6, title: "Áo Kiểu Nữ Thanh Lịch", price: "310.000 VNĐ", image: nu2 },
    { id: 7, title: "Đầm Nữ Dạo Phố", price: "490.000 VNĐ", image: nu3 },
    { id: 8, title: "Sơ Mi Nữ Công Sở", price: "330.000 VNĐ", image: nu4 },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center fw-bold mb-4 text-uppercase">
        Sản Phẩm Nổi Bật
      </h2>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard
              title={product.title}
              price={product.price}
              image={product.image}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
