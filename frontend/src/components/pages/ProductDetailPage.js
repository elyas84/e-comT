import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "../layout/Product";
import {
  productListDetail,
  getProductList,
} from "../../redux/actions/productActions";
import { Col, Container, Row, Image, Button, Card } from "react-bootstrap";
import Message from "../layout/Message";
import Loader from "../layout/Loader";

export default function ProductDetailPage({ match }) {
  const dispatch = useDispatch();
  const producutDetail = useSelector((state) => state.producutDetail);
  const { loading, product, error } = producutDetail;
  const Product_ID = match.params.id;
  const productList = useSelector((state) => state.productList);
  const { loading: listLoading, products, error: listError } = productList;
  useEffect(() => {
    dispatch(productListDetail(Product_ID));
  }, [match, dispatch, Product_ID]);

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  return (
    <>
      <Container>
        {loading && <Loader />}
        {error && <Message>{error}</Message>}

        {product && (
          <Row className="mt-5">
            <Col lg={6} md={8} sm={12}>
              <Image src={product.productImg} fluid></Image>
            </Col>
            <Col lg={6} md={4} sm={12} variant="flush">
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <hr />

              <h4>$ {product.price}</h4>
              <Row>
                <Col>
                  <Button variant="success">Add to cart </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Container>
      <h3
        className="py-3 text-center mt-5 mb-5 text-white"
        style={{ backgroundColor: "#919aa1" }}
      >
        You may also like these products
      </h3>
      <Container>
        {listLoading ? (
          <Loader />
        ) : listError ? (
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

        {/* <Row>
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
        </Row> */}
      </Container>
    </>
  );
}
