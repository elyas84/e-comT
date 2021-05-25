import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../../redux/actions/productActions";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import Loader from "../layout/Loader";
import Message from "../layout/Message";
import Product from "../layout/Product";
import { Link } from "react-router-dom";
export default function MobilePage() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  console.log(products);
  const [visible, setVisible] = useState(3);

  const loadMore = () => {
    setVisible((prevValue) => prevValue + 3);
  };
  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  // checkbox

  const [samsung, setSamsung] = useState(false);
  const [iphone, setIphone] = useState(false);
  const [nokia, setNokia] = useState(false);

  // checkbox filtering logic

  const getSamsungOnly = products.filter((userCheck) => {
    if (userCheck.brand === "Samsung") {
      return getProductList;
    }
  });
  const getIphoneOnly = products.filter((userCheck) => {
    if (userCheck.brand === "Iphone") {
      return getProductList;
    }
  });

  const getNokiaOnly = products.filter((userCheck) => {
    if (userCheck.brand === "Nokia") {
      return getProductList;
    }
  });

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
              checked={samsung}
              onChange={(e) => {
                setSamsung(e.target.checked);
              }}
            />
          </Col>
          <Col lg={2}>
            <label htmlFor="iphone" className="mr-3">
              Iphone
            </label>
            <input
              type="checkbox"
              checked={iphone}
              onChange={(e) => {
                setIphone(e.target.checked);
              }}
            />
          </Col>
          <Col lg={2}>
            <label htmlFor="nokia" className="mr-3">
              Nokia
            </label>
            <input
              type="checkbox"
              checked={nokia}
              onChange={(e) => {
                setNokia(e.target.checked);
              }}
            />
          </Col>
        </Row>
        {loading && <Loader />}
        {error && <Message>{error}</Message>}
        <Row>
          {samsung && getSamsungOnly && getSamsungOnly.length
            ? getSamsungOnly.map((product) => (
                <Col sm={12} md={6} lg={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))
            : iphone && getIphoneOnly && getIphoneOnly.length
            ? getIphoneOnly.map((product) => (
                <Col sm={12} md={6} lg={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))
            : nokia && getNokiaOnly && getNokiaOnly.length
            ? getNokiaOnly.map((product) => (
                <Col sm={12} md={6} lg={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))
            : products.map((product) => {
                if (product.category === "mobile") {
                  return (
                    <Col sm={12} md={6} lg={3} key={product._id}>
                      <Product product={product} />
                    </Col>
                  );
                }
              })}
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

/* {
                
                products.map((product) => {
                if (product.category === "mobile") {
                  return (
                    <Col sm={12} md={6} lg={3} key={product._id}>
                      <Product product={product} />
                    </Col>
                  );
                }
              })
              
              
              } */

//  {
//    samsung
//      ? getSamsungOnly && getSamsungOnly.lenght
//        ? getSamsungOnly.map((product) => (
//            <Col sm={12} md={6} lg={3} key={product._id}>
//              <Product product={product} />
//            </Col>
//          ))
//        : null
//      : null;
//  }
