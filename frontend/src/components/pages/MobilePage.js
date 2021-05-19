import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../../redux/actions/productActions";
import {
  Col,
  Container,
  Row,
  Button,
  Card
 
} from "react-bootstrap";
import Loader from "../layout/Loader";
import Message from "../layout/Message";
import Product from "../layout/Product";
import { Link } from "react-router-dom";
export default function MobilePage() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  console.log(products)
  const [visible, setVisible] = useState(3);



  const loadMore = () => {
    setVisible((prevValue) => prevValue + 3);
  };
  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);
  



  return (
    <>
      <Container>
        <h2 className="text-center py-5"> Mobiles</h2>
        <Row>
          <Col lg={2}>
            <label htmlFor="samsung" className="mr-3">
              Samsung
            </label>
            <input
              type="checkbox"
              name="samsung"
              id="samsung"
           
            />
          </Col>
          <Col lg={2}>
            <label htmlFor="iphone" className="mr-3">
              Iphone
            </label>
            <input type="checkbox" name="iphone" id="iphone" />
          </Col>
          <Col lg={2}>
            <label htmlFor="nokia" className="mr-3">
              Nokia
            </label>
            <input type="checkbox" name="nokia" id="nokia" />
          </Col>
        </Row>
        <Row>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Row className="mt-3">
              {products.map((product) => {
                if (product.category === "mobile") {
                  return (
                    <Col sm={12} md={6} lg={3} key={product._id}>
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
