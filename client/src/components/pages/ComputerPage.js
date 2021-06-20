import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../../redux/actions/productActions";
import {
  Col,
  Container,
  Row,
  Button,
} from "react-bootstrap";
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
        <Row>
          <Col lg={2}>
            <label htmlFor="mac" className="mr-3">
              MacBook
            </label>
            <input type="checkbox" name="mac" id="mac" />
          </Col>
          <Col lg={2}>
            <label htmlFor="win" className="mr-3">
              Windows
            </label>
            <input type="checkbox" name="win" id="win" />
          </Col>
          <Col lg={2}>
            <label htmlFor="xbox" className="mr-3">
              Xbox
            </label>
            <input type="checkbox" name="xbox" id="xbox" />
          </Col>
          <Col lg={2}>
            <label htmlFor="ps" className="mr-3">
              Play Station
            </label>
            <input type="checkbox" name="ps" id="ps" />
          </Col>
        </Row>
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
          <Row className="mt-5 ">
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
              .slice(0, Math.floor(Math.random() * 4 + 1))}
          </Row>
        )}

        <Row className="mt-5 text-center">
          <Col lg={12}>
            <Button variant="outline-primary" onClick={loadMore}>
              Load more
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
