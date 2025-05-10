import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckFast,
  faArrowsRotate,
  faHeadset,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";

const Policy = () => {
  return (
    <div className="policy-section">
      <div className="container px-md-5 py-5">
        <Row xs={1} md={2} lg={4} className="py-4">
          <Col className="py-2">
            <div className="d-flex flex-column align-items-center">
              <FontAwesomeIcon icon={faTruckFast} size="xl" />
              <h6 className="mt-3 mb-1">Free Delivery</h6>
              <p className="mb-0">Free Shipping with discount</p>
            </div>
          </Col>
          <Col className="py-2 border-start">
            <div className="d-flex flex-column align-items-center">
              <FontAwesomeIcon icon={faArrowsRotate} size="xl" />
              <h6 className="mt-3 mb-1">Return Policy</h6>
              <p className="mb-0">Back guarantee under 7 days</p>
            </div>
          </Col>
          <Col className="py-2 border-start">
            <div className="d-flex flex-column align-items-center">
              <FontAwesomeIcon icon={faHeadset} size="xl" />
              <h6 className="mt-3 mb-1">24/7 Support</h6>
              <p className="mb-0">Support 24/7 At Anytime</p>
            </div>
          </Col>
          <Col className="py-2 border-start">
            <div className="d-flex flex-column align-items-center">
              <FontAwesomeIcon icon={faCoins} size="xl" />
              <h6 className="mt-3 mb-1">Secure Payment</h6>
              <p className="mb-0">Secure Payment Totally Safe</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Policy;
