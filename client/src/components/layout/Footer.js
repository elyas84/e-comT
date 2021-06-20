import React from "react";
import { Col, Container, Row,Form ,Button} from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Footer() {

  const mailHandler = (e)=> {
    e.preventDefault();
    window.alert("Subscribe feature is not implemented yet. Please try later.")
  }
  return (
    <footer className="mt-5">
      <Container className="py-5">
        <Row>
          <Col lg={3} md={6} sm={12}>
            <h6>pages</h6>
            <div>
              <Link to="/about">About us</Link>
            </div>
            <div>
              <Link to="/contact">Contact</Link>
            </div>
            <hr />
            <h6>User section</h6>
            <div>
              <Link to="/login">Login</Link>
            </div>
            <div>
              <Link to="/register">Regsiter</Link>
            </div>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <h6>Top categories</h6>
            <div>
              <Link to="/mobile">Mobile</Link>
            </div>
            <div>
              <Link to="/Computer">Computer</Link>
            </div>
            <hr />
          </Col>
          <Col lg={3} md={6} sm={12}>
            <h6>Where to find us</h6>
            <b>E-Shop</b> <br />
            Storgatan 100A <br />
            Stockholm
            <br />
            Sweden
          </Col>
          <Col>
            <h6>Get the news</h6>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore,
              dolorem!
            </p>
            <hr />
            <Form onSubmit={mailHandler}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
