import React from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";

export default function ContactPage() {
  return (
    <>
      <Row style={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }} className="py-3 ">
        <Col lg={8} sm={12} className="m-auto">
          <h2>Contact</h2>
          <p className="text-center">
            Are you curious about something? Do you have some kind of problem
            with our products? <br />
            Please feel free to contact us, our customer service center is
            working for you 24/7.
          </p>
        </Col>
      </Row>
      <Container>
        <Row className="py-5">
          <Col lg={3} sm={12} className="m-auto">
            <h5>
              {" "}
              <i className="fas fa-map-marker-alt"></i>Address
            </h5>
            <p>
              Stor gatan 100 A <br />
              Stcokholm <br />
              123456 <br />
              Sweden
            </p>
          </Col>
          <Col lg={3} sm={12} className="m-auto">
            <h5>
              <i className="fas fa-mobile-alt"></i>Call center
            </h5>
            <p>
              This number is toll free if calling from Great Britain otherwise
              we advise you to use the electronic form of communication. <br />
              +46 12 34 56 78
            </p>
          </Col>
          <Col lg={3} sm={12} className="m-auto">
            <h5>
              <i className="fas fa-envelope"></i>Electronic support
            </h5>
            <p>
              Please feel free to write an email to us or to use our electronic
              ticketing system.
            </p>
            <ul>
              <li>fake@eamil.com</li>
            </ul>
          </Col>
        </Row>
        <Row className="py-3">
          <Col lg={6} md={6} sm={12} className="m-auto">
            <Form>
              <Form.Group controlId="contactName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="contactEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>

              <Button variant="info" type="submit" block >
                Send message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
