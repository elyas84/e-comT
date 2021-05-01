import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Card,
  ListGroup,
  Badge,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getProductList } from "../../redux/actions/productActions";
import Loader from "../layout/Loader";
import Message from "../layout/Message";
import Product from "../layout/Product";
export default function AllProductPage() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  console.log("products: ",products)


const [visible, setVisible] = useState(3);

  useEffect(() => {
    dispatch(getProductList());

  }, [dispatch]);

const loadMore = ()=>{
setVisible((prevValue)=>prevValue+4)
}
  return (
    <>
      <Container>
        <h2 className="text-center py-5"> Products</h2>
        <Row className="p-3">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Row>
              {products.slice(0, visible).map((product) => (
                <Col lg={4} md={6} sm={12} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Row>
        <Row className="mt-5">
          <Col lg={12}>
            <Button
              variant="primary"
              onClick={loadMore}
            >
              Load more
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
