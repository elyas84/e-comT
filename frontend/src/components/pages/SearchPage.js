import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../layout/Message";
import Product from "../layout/Product";
import { getProductList } from "../../redux/actions/productActions";
export default function SearchPage({ match }) {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  //    console.log(products);

  const [visible, setVisible] = useState(3);

  const loadMore = () => {
    setVisible((prevValue) => prevValue + 3);
  };
  useEffect(() => {
    dispatch(getProductList(keyword));
  }, [dispatch, keyword]);
  return (
    <>
      <Container>
        <h1 className="py-5">Searching Result</h1>
        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {products.slice(0, visible).map((product) => (
              <Col lg={4} md={6} sm={12} key={product._id} className="py-2">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}

        <Row className="mt-5 text-center">
          <Link to="/">Back</Link>
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
