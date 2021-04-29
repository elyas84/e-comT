import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Container, Row, ListGroup, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";

export default function AdminAccountPage() {
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
    <Container>
      <Row className="m-auto py-5">
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
            {/* <Link to="/admin/edit-product">
              <ListGroup.Item as="li">Edit Product</ListGroup.Item>
            </Link> */}
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
          <Row className="p-2">
            <Col>
              <h2>My account</h2>
              <p>
                Change your personal details or your password here. <br />
              </p>
            </Col>
          </Row>

          <Form style={{ width: "60%" }} className="m-auto">
            <Form.Group controlId="updateEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group controlId="comfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Button variant="primary" variant="info">
              Save changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
