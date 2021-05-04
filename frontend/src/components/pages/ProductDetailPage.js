import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "../layout/Product";
import {
  productListDetail,
  getProductList,
} from "../../redux/actions/productActions";
import {
  Col,
  Container,
  Row,
  Image,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Message from "../layout/Message";
import Loader from "../layout/Loader";
import { useHistory } from "react-router-dom";

export default function ProductDetailPage({ match }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const producutDetail = useSelector((state) => state.producutDetail);
  const { loading, product, error } = producutDetail;
  const Product_ID = match.params.id;
  const productList = useSelector((state) => state.productList);
  const { loading: listLoading, products, error: listError } = productList;
  useEffect(() => {
    dispatch(productListDetail(Product_ID));
  }, [match, dispatch, Product_ID]);

  const [qyt, setQty] = useState(1);
  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  const addToCartHandler = () => {
    history.push("/cart/" + Product_ID + "?quantity=" + qyt);
  };

    const [visible, setVisible] = useState(3);

    const loadMore = () => {
      setVisible((prevValue) => prevValue + 3);
    };
  return (
    <>
      <Container>
        {loading && <Loader />}
        {error && <Message>{error}</Message>}

        {product && (
          <Row className="mt-5">
            <Col lg={6} md={8} sm={12}>
              <Image
                src={product.productImg}
                fluid
                style={{ height: "250px" }}
              ></Image>
            </Col>
            <Col lg={6} md={4} sm={12} variant="flush">
              <h4>{product.name}</h4>
              <p>{product.description}</p>

              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "available" : "Unavailable"}
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Quanity</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qyt}
                        onChange={(e) => {
                          setQty(e.target.value);
                        }}
                      >
                        {[...Array(product.countInStock).keys()].map((item) => (
                          <option key={item + 1} value={item + 1}>
                            {item + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
              <h4 className="mt-3 mb-3 ">$ {product.price}</h4>

              <Row className="text-right">
                <Col>
                  <Button
                    variant="warning"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to cart{" "}
                  </Button>
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
