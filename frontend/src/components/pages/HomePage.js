import React from "react";
import { Carousel, Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <>
      <Container>
        <Carousel className="mt-5">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/playstation4.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Play station4</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/xbox1.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Xbox one</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/samsung.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3 className="text-white">Samsung</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/iphone.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3 className="text-white">IPhone</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
      <Container>
        <Row className="mt-5">
          <Col lg={4} md={6} sm={12} className="homeCard">
            {" "}
            <Card>
              <Card.Body>
                <Card.Title>WE LOVE OUR CUSTOMERS</Card.Title>
                <Card.Text>
                  We are known to provide best possible service ever
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={12} className="homeCard">
            {" "}
            <Card>
              <Card.Body className="homeCard_body">
                <Card.Title>BEST PRICES</Card.Title>
                <Card.Text>
                  You can check that the height of the boxes adjust when longer
                  text like this one is used in one of them.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} sm={12} className="homeCard">
            {" "}
            <Card>
              <Card.Body>
                <Card.Title>100% SATISFACTION GUARANTEED</Card.Title>
                <Card.Text>Free returns on everything for 3 months.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Row className="possible_deal mt-5 p-2">
        <Col className=" text-center ">
          <h3>Possible Deal</h3>
        </Col>
      </Row>
      <Container>
        <Row className="mt-5 mb-5">
          <Col lg={3} md={4} sm={12}>
            <Card className="possible_card">
              <Card.Img variant="top" src="images/headset.jpg" />
              <Card.Body className="text-center">
                <Link to="/detail">
                  <Card.Title>Headset</Card.Title>
                </Link>

                <Card.Text>$ 120</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card>
              <Card.Img variant="top" src="images/macbook.jpg" />
              <Card.Body className="text-center">
                <Card.Title>Headset</Card.Title>
                <Link to="#">
                  <Card.Text>$ 120</Card.Text>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card>
              <Card.Img variant="top" src="images/controller.jpg" />
              <Card.Body className="text-center">
                <Card.Title>Headset</Card.Title>
                <Link to="#">
                  <Card.Text>$ 120</Card.Text>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <Card>
              <Card.Img variant="top" src="images/drone.jpg" />
              <Card.Body className="text-center">
                <Card.Title>Headset</Card.Title>
                <Link to="#">
                  <Card.Text>$ 120</Card.Text>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container>
        <Carousel className="mt-5">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/drone1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 className="text-white">Drone Air</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/handControl.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3 className="text-white">Hand Control</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/laptop.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3 className="text-white">Google Laptop</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/airpods.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3 className="text-white">Airpods</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
}
