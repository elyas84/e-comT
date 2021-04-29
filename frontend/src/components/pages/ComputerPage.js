import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../../redux/actions/productActions";
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
import Loader from "../layout/Loader";
import Message from "../layout/Message";
import Product from "../layout/Product";
export default function ComputerPage() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Row className="p-3">
          <Col lg={3}>
            <Card>
              <Card.Header>Computers</Card.Header>
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
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Row className="mt-5">
                {products.map((product) => {
                  if (product.category === "pc") {
                    return (
                      <Col sm={12} md={6} lg={3} key={product._id}>
                        <Product product={product} />
                      </Col>
                    );
                  }
                })}
              </Row>
            )}
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
