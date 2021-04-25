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
export default function MobilePage() {
  return (
    <Container>
      <Row className="p-3">
        <Col lg={3}>
          <Card>
            <Card.Header>Mobiles</Card.Header>
            <ListGroup variant="flush">
              <p className="p-2">
                Samsung{" "}
                <Badge pill variant="info">
                  10
                </Badge>
              </p>

              <ListGroup.Item>
                <Link to="/detail">Samsung A20</Link>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup variant="flush">
              <p className="p-2">
                Iphone{" "}
                <Badge pill variant="info">
                  5
                </Badge>
              </p>
              <ListGroup.Item>
                <Link to="/detail">Iphone 11</Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col lg={8}>
          <Row>
            <Col lg={5} md={6} sm={12}>
              <Card>
                <Card.Img variant="top" src="images/samsung.jpg" />
                <Card.Body>
                  <Card.Title>Samsung</Card.Title>
                  <Card.Text>$ 250</Card.Text>
                  <Row>
                    <Col sm={6}>
                      {" "}
                      <Link to="/detail">
                        <Button
                          style={{ padding: "7px" }}
                          variant="outline-secondary"
                        >
                          View detail
                        </Button>
                      </Link>
                    </Col>
                    <Col sm={6}>
                      {" "}
                      <Link to="/detail">
                        <Button
                          style={{ padding: "7px" }}
                          variant="outline-secondary"
                        >
                          Add to cart
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            {/* <Col lg={5} md={6} sm={12}>
              <Card>
                <Card.Img variant="top" src="images/headset.jpg" />
                <Card.Body>
                  <Card.Title>headset</Card.Title>
                  <Card.Text>$ 250</Card.Text>
                  <Row>
                    <Col lg={6}>
                      {" "}
                      <Button style={{ padding: "7px" }} variant="primary">
                        View detail
                      </Button>
                    </Col>
                    <Col lg={6}>
                      {" "}
                      <Button style={{ padding: "7px" }} variant="primary">
                        Add to cart
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col> */}
          </Row>
          <Row className="mt-5">
            <Col lg={12}>
              <Button variant="info">Load more</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
