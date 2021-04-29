import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../../redux/actions/productActions";
import { Carousel, Container, Col, Row, Card } from "react-bootstrap";

import Loader from "../layout/Loader";
import Message from "../layout/Message";
import Product from "../layout/Product";
export default function HomePage() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

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
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row className="mt-5">
            {products
              .map((product) => (
                <Col sm={12} md={6} lg={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))
              .slice(0, 4)}
          </Row>
        )}
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
