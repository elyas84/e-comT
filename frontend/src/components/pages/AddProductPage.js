import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Container, Row, ListGroup, Form ,Button} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";

export default function AddProductPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  useEffect(() => {
    if (!userDetail.name) {
      history.push("/");
    }
  }, [userDetail, history]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };
  return (
    <>
      <Container>
        <Row className="">
          <Col lg={3}>
            <ListGroup as="ul">
              <ListGroup.Item as="li" active>
                Customer section
              </ListGroup.Item>
              <Link to="/admin/orderlist">
                <ListGroup.Item as="li">Customers orders</ListGroup.Item>
              </Link>
              <Link to="/admin/customers-list">
                <ListGroup.Item as="li">Customer list</ListGroup.Item>
              </Link>
              <Link to="/admin/products-list">
                <ListGroup.Item as="li">Products list</ListGroup.Item>
              </Link>
              <Link to="/admin/new-product">
                <ListGroup.Item as="li">New Product</ListGroup.Item>
              </Link>
              <Link to="/admin/edit-product">
                <ListGroup.Item as="li">Edit Product</ListGroup.Item>
              </Link>
              <Link to="/admin/account">
                <ListGroup.Item as="li">My account</ListGroup.Item>
              </Link>
              <Link to="#">
                <ListGroup.Item as="li" onClick={logoutHandler}>
                  Logout
                </ListGroup.Item>
              </Link>
            </ListGroup>
          </Col>
          <Col>
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <h2>Add new product</h2>
                  </Col>
                </Row>

                <Form>
                  <Row>
                    <Col>
                      <Form.Group controlId="productName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                      <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                      <Form.Group controlId="description">
                        <Form.Label>description</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="price">
                        <Form.Label>price</Form.Label>
                        <Form.Control type="number" />
                      </Form.Group>
                      <Form.Group controlId="countInStock">
                        <Form.Label>countInStock</Form.Label>
                        <Form.Control type="number" />
                      </Form.Group>{" "}
                      <br />
                      <Form.File
                        id="productImage"
                        label="product img"
                        data-browse="Upload"
                        custom
                      />
                    </Col>
                  </Row>

                  <Button variant="primary" type="submit">
                    Create
                  </Button>
                </Form>
              </Col>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
