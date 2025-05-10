import { Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faPinterest,
  faCcPaypal,
  faCcVisa,
  faCcMastercard,
  faCcAmazonPay,
  faGooglePay,
} from "@fortawesome/free-brands-svg-icons";

const FooterSection = () => {
  return (
    <div className="footer-section">
      <div className="container px-5 pt-5 pb-3">
        <Row xs={1} md={2} lg={4}>
          <Col className="px-2">
            <h5 className="text-uppercase fw-bold mb-4">categories</h5>
            <ul className="list-unstyled">
              <li className="py-2">
                <a href="/#">Women</a>
              </li>
              <li className="py-2">
                <a href="/#">Men</a>
              </li>
            </ul>
          </Col>
          <Col className="px-2">
            <h5 className="text-uppercase fw-bold mb-3">Help</h5>
            <ul className="list-unstyled">
              <li className="py-2">
                <a href="/#">Track Order</a>
              </li>
              <li className="py-2">
                <a href="/#">Return</a>
              </li>
              <li className="py-2">
                <a href="/#">Shipping</a>
              </li>
              <li className="py-2">
                <a href="/#">FAQs</a>
              </li>
            </ul>
          </Col>
          <Col className="px-2">
            <h5 className="text-uppercase fw-bold mb-3">Get in Touch</h5>
            <p className="py-2">
              Any questions? Let us know in store at 8th floor, 379 Hudson St,
              New York, NY 10018 or call us on (+1) 96 716 6879
            </p>
            <ul className="d-flex list-unstyled">
              <li className="mx-2">
                <a href="/#">
                  <FontAwesomeIcon icon={faFacebookF} size="lg" />
                </a>
              </li>
              <li className="mx-2">
                <a href="/#">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
              </li>
              <li className="mx-2">
                <a href="/#">
                  <FontAwesomeIcon icon={faPinterest} size="lg" />
                </a>
              </li>
            </ul>
          </Col>
          <Col className="px-2">
            <h5 className="text-uppercase fw-bold mb-3">Newsletter</h5>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Button className="text-uppercase px-5 py-3 rounded-pill">
                Subcribe
              </Button>
            </Form>
          </Col>
        </Row>
        <div className="payment-support d-flex justify-content-center mt-4">
          <a href="/#" className="px-1">
            <FontAwesomeIcon icon={faCcPaypal} size="xl" />
          </a>
          <a href="/#" className="px-1">
            <FontAwesomeIcon icon={faCcVisa} size="xl" />
          </a>
          <a href="/#" className="px-1">
            <FontAwesomeIcon icon={faCcMastercard} size="xl" />
          </a>
          <a href="/#" className="px-1">
            <FontAwesomeIcon icon={faCcAmazonPay} size="xl" />
          </a>
          <a href="/#" className="px-1">
            <FontAwesomeIcon icon={faGooglePay} size="xl" />
          </a>
        </div>
        <div className="copyright mt-4">
          <p className="text-center">
            Copyright ©2024 All rights reserved | Made by
            <a href="/#" className="px-1">
              Hoang Luu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default FooterSection;
