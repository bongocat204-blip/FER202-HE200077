import Carousel from "react-bootstrap/Carousel";
import banner1 from "./banner1.jpg";
import banner2 from "./banner2.jpg";
import banner3 from "./banner3.jpg";

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <banner1 text="First slide" />
        <Carousel.Caption>
          <h3>FASHION COLLECTION 2026</h3>
          <p>Discover the latest fashion trends for 2026</p>
          <image src={banner1} />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <banner2 text="Second slide" />
        <Carousel.Caption>
          <h3>SUMMER SALE UP TO 50%</h3>
          <p>Enjoy special discount on selected products</p>
          <image src={banner2} />
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <banner3 text="Third slide" />
        <Carousel.Caption>
          <h3>NEW ARRIVALS</h3>
          <p>Explore our newest clothing collection</p>
          <image src={banner3} />
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
