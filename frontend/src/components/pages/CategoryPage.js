import React from "react";
import {
  Col,
  Container,
  Row,
  Card,
  ListGroup,
  Badge,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
export default function CategoryPage() {
  return (
    <>
      <Container>
        <Row className="p-3">
          <Col lg={3}>
            <Card>
              <Card.Header>All Products</Card.Header>
              <ListGroup variant="flush">
                <p className="p-2">
                  Hp{" "}
                  <Badge pill variant="info">
                    10
                  </Badge>
                </p>

                <ListGroup.Item>
                  <Link to="/detail">Hp Pavillion</Link>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup variant="flush">
                <p className="p-2">
                  MacBook{" "}
                  <Badge pill variant="info">
                    5
                  </Badge>
                </p>
                <ListGroup.Item>
                  <Link to="/detail">Macbook pro</Link>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col lg={8}>
            <Row>
              <Col lg={4} md={6} sm={12}>
                <Card>
                  <Card.Img variant="top" src="images/macbook.jpg" />
                  <Card.Body>
                    <Link to="/detail">
                      <Card.Title>Samsung</Card.Title>
                    </Link>

                    <Card.Text>$ 250</Card.Text>
                    <Link to="/cart">
                      <Button
                        style={{ padding: "7px" }}
                        variant="outline-secondary"
                        block
                      >
                        Add to cart
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col lg={12}>
                <Button variant="info">Load more</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
