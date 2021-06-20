import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
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
  // console.log("products: ",products)


const [visible, setVisible] = useState(3);

  useEffect(() => {
    dispatch(getProductList());

  }, [dispatch]);

const loadMore = ()=>{
setVisible((prevValue)=>prevValue+3)
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
        <Row className="mt-5 text-center">
          <Col lg={12}>
            <Button
              variant="outline-primary"
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
