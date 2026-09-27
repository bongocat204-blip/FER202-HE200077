import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductCard({ title, price, image }) {
  return (
    <Card className="h-100 shadow-sm border-0">
      {/* Khung chứa ảnh để đảm bảo tất cả các thẻ có cùng chiều cao ảnh */}
      <div style={{ height: "260px", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <Card.Body className="d-flex flex-column justify-content-between text-center">
        <div>
          <Card.Title className="fs-6 fw-bold text-dark">{title}</Card.Title>
          <Card.Text className="text-danger fw-bold fs-5 my-2">
            {price}
          </Card.Text>
        </div>

        <Button variant="dark" className="w-100 mt-2">
          Thêm vào giỏ
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
