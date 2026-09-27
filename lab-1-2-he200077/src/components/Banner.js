import Carousel from "react-bootstrap/Carousel";
import banner1 from "./banner1.jpg";
import banner2 from "./banner2.jpg";
import banner3 from "./banner3.jpg";

function Banner() {
  return (
    <Carousel fade interval={3000}>
      <Carousel.Item>
        <div style={{ position: "relative", height: "450px" }}>
          <img
            className="d-block w-100 h-100"
            src={banner1}
            alt="First slide"
            style={{ objectFit: "cover" }}
          />
          {/* Lớp phủ tối màu giúp chữ hiển thị rõ ràng hơn */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
          />
        </div>
        <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center pb-5">
          <h3 className="fw-bold fs-2 text-uppercase text-white">
            FASHION COLLECTION 2026
          </h3>
          <p className="fs-5 text-light">
            Discover the latest fashion trends for 2026
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <div style={{ position: "relative", height: "450px" }}>
          <img
            className="d-block w-100 h-100"
            src={banner2}
            alt="Second slide"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
          />
        </div>
        <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center pb-5">
          <h3 className="fw-bold fs-2 text-uppercase text-white">
            SUMMER SALE UP TO 50%
          </h3>
          <p className="fs-5 text-light">
            Enjoy special discount on selected products
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <div style={{ position: "relative", height: "450px" }}>
          <img
            className="d-block w-100 h-100"
            src={banner3}
            alt="Third slide"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
          />
        </div>
        <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center pb-5">
          <h3 className="fw-bold fs-2 text-uppercase text-white">
            NEW ARRIVALS
          </h3>
          <p className="fs-5 text-light">
            Explore our newest clothing collection
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
