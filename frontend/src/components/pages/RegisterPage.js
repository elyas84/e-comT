import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
export default function RegisterPage() {
  return (
    <Container>
      <Row className="py-5 justify-content-center">
        <Col lg={5} className="bg-light mr-3">
          <div className="py-5">
            <h2>New account</h2>
            <span>
              Not our registered customer yet?
              <br />
              <br />
              With registration with us new world of fashion, fantastic
              discounts and much more opens to you! The whole process will not
              take you more than a minute! <br />
              <br />
              If you have any questions, please feel free to contact us, our
              customer service center is working for you 24/7.
            </span>
            <hr />
          </div>

          <Form>
            <Form.Group controlId="name">
              <Form.Label>Your name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group controlId="pass1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group controlId="pass2">
              <Form.Label>Comfirm Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
        <Col lg={5} className="bg-light">
          <div className="py-5">
            <h2>Login</h2>
            Already our customer? <br />
            <br />
            <span>
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
              vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit
              amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
              placerat eleifend leo.
            </span>
            <hr />
          </div>

          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
