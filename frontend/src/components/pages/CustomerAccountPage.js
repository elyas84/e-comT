import React from "react";
import { Col, Container, Form, Row, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function CustomerAccountPage() {
  return (
    <Container>
      <Row className="m-auto py-5">
        <Col lg={3}>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              Customer section
            </ListGroup.Item>
            <Link to="/customer-orders">
              <ListGroup.Item as="li">My orders</ListGroup.Item>
            </Link>

            <Link to="/customer-account">
              <ListGroup.Item as="li">My account</ListGroup.Item>
            </Link>
            <Link to="/">
              <ListGroup.Item as="li">Logout</ListGroup.Item>
            </Link>
          </ListGroup>
        </Col>
        <Col lg={8}>
          <Row
            style={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
            className="p-2"
          >
            <Col>
              <h2>My account</h2>
              <p>
                Change your personal details or your password here. <br />
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas.
              </p>
            </Col>
          </Row>

          <Form>
            <Form.Group controlId="updateEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group controlId="comfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Button variant="primary" variant="info">
              Save changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
