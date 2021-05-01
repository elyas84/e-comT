import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { Container, Row, Col } from "react-bootstrap";
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
            {products.map((product) => (
              <Col lg={3} md={3} sm={12} key={product._id} className="py-2">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}

        <Link to="/">Back</Link>
      </Container>
    </>
  );
}
