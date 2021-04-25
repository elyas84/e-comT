import React from 'react'
import { Col, Container, Row,Image, Button,Card } from 'react-bootstrap'

export default function ProductDetailPage() {
    return (
      <>
        <Container>
          <Row className="mt-5">
            <Col lg={6} md={8} sm={12}>
              <Image src="images/iphone.jpg" fluid></Image>
            </Col>
            <Col lg={6} md={4} sm={12} variant="flush">
              <h4>Drone 1</h4>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim
                minima numquam quaerat natus earum eum incidunt laboriosam
                architecto illum molestiae.
              </p>
              <hr />
              <ul>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Rerum, magnam.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Rerum, magnam.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Rerum, magnam.
                </li>
              </ul>
              <h4>$ 124</h4>
              <Row>
                <Col>
                  <Button variant="outline-success">Add to cart </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <h3
          className="py-3 text-center mt-5 mb-5 text-white"
          style={{ backgroundColor: "#919aa1" }}
        >
          You may also like these products
        </h3>
        <Container>
          <Row>
            <Col lg={4} dm={3} sm={12}>
              <Card>
                <Card.Img variant="top" src="images/macbook.jpg" />
                <Card.Body>
                  <Card.Title>Samsung</Card.Title>
                  <Card.Text>$ 250</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} dm={3} sm={12}>
              <Card>
                <Card.Img variant="top" src="images/macbook.jpg" />
                <Card.Body>
                  <Card.Title>Samsung</Card.Title>
                  <Card.Text>$ 250</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} dm={3} sm={12}>
              <Card>
                <Card.Img variant="top" src="images/macbook.jpg" />
                <Card.Body>
                  <Card.Title>Samsung</Card.Title>
                  <Card.Text>$ 250</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
}
