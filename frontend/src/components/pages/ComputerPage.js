import React, { useEffect, useState } from "react";
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
const [visible, setVisible] = useState(3);
  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  const loadMore = () => {
    setVisible((prevValue) => prevValue + 3);
  };
  return (
    <>
      <Container>
        <h2 className="text-center py-5"> Computers and games</h2>
        <Row className="p-3">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Row>
              {products.map((product) => {
                if (product.category === "pc" || product.category === "game") {
                  return (
                    <Col sm={12} md={6} lg={4} key={product._id}>
                      <Product product={product} />
                    </Col>
                  );
                }
              })}
            </Row>
          )}
        </Row>
        <Row className="mt-5">
          <Col lg={12}>
            <Button variant="primary" onClick={loadMore}>
              Load more
            </Button>
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
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row className="mt-5">
            {products
              .map((product) => {
                if (product.category === "mobile") {
                  return (
                    <Col sm={12} md={6} lg={3} key={product._id}>
                      <Product product={product} />
                    </Col>
                  );
                }
              })
              .slice(0, 4)}
          </Row>
        )}
      </Container>
    </>
  );
}
