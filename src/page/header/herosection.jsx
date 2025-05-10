import { Container, Carousel, Image, Button } from "react-bootstrap";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <Container fluid className="px-0 mx-0">
        <Carousel indicators={false} fade={true}>
          <Carousel.Item>
            <Image
              className="w-100 vh-100 object-fit-cover"
              src={"https://devcamp-cozastore.netlify.app/images/slide-05.jpg"}
              text="First slide"
            />
            <div className="carousel-overlay"></div>
            <Carousel.Caption>
              <h3 className="fadeIn-Top mb-3">Women Collection 2018</h3>
              <h1 className="fw-bold text-uppercase fadeIn-Bottom mb-5">
                New arrivals
              </h1>
              <Button
                variant="danger"
                className="px-5 py-3 fw-bold text-uppercase rounded-pill fadeIn-Bottom"
              >
                Shop now
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              className="w-100 vh-100 object-fit-cover"
              src={"https://devcamp-cozastore.netlify.app/images/slide-06.jpg"}
              text="First slide"
            />
            <div className="carousel-overlay"></div>
            <Carousel.Caption>
              <h3 className="fadeIn-Top mb-3">Men New-Seasion</h3>
              <h1 className="fw-bold text-uppercase fadeIn-Bottom mb-5">
                Jackets & Coats
              </h1>
              <Button
                variant="danger"
                className="px-5 py-3 fw-bold text-uppercase rounded-pill fadeIn-Bottom "
              >
                Shop now
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};
export default HeroSection;
