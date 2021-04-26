import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Container, Row, ListGroup, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";

export default function CustomerAccountPage() {
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
      <Row className="m-auto">
        <Col lg={3}>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              Customer section
            </ListGroup.Item>
            <Link to="/customer-orders">
              <ListGroup.Item as="li">My orders</ListGroup.Item>
            </Link>

            <Link to="/order-details">
              <ListGroup.Item as="li">Order Details</ListGroup.Item>
            </Link>
            <Link to="/customer-account">
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
<Row>
  <Col lg={8} md={6} sm={12}>
      <Form>
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
        
        </Col>
      </Row>
    </Container>
  );
}
