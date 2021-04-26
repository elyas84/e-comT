import React, { useEffect, useState } from "react";
import { Col, Container, Row, ListGroup, Table, Badge } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
export default function CustomerOrderPage() {
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
      <Row>
        
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
        <Col lg={8}>
          <Row>
            <Col>
              <h2>My Orders</h2>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-1">154564878979</td>
                    <td className="p-1">22/06/2013</td>
                    <td className="p-1">$ 150.00</td>
                    <td className="p-1">
                      <Badge variant="info">on hold</Badge>
                    </td>
                    <td className="p-0">
                      <Link to="/order-details">
                        <Badge variant="success">view</Badge>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
