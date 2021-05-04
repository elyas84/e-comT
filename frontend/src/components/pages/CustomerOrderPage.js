import React, { useEffect, useState } from "react";
import { Col, Container, Row, ListGroup, Table, Badge } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { getMyOrderList } from "../../redux/actions/orderActions";
import Message from "../layout/Message";
import Loader from "../layout/Loader";
export default function CustomerOrderPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const userOrderList = useSelector((state) => state.userOrderList);
  const { Myorders, loading, error } = userOrderList;

  const orderDetail = useSelector((state) => state.orderDetail);
  const { order } = orderDetail;

  console.log("order: ", order);

  useEffect(() => {
    if (!userDetail.name) {
      history.push("/");
    } else {
      dispatch(getMyOrderList());
    }
  }, [userDetail, history, dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };
  return (
    <Container className="py-5">
      <Row>
        <Col lg={3}>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              Customer section
            </ListGroup.Item>
            <Link to="/customer-orders">
              <ListGroup.Item as="li">My orders</ListGroup.Item>
            </Link>

            {/* <Link to="/order-details">
              <ListGroup.Item as="li">Order Details</ListGroup.Item>
            </Link> */}
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
                    <th>ID</th>
                    <th>Name</th>

                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && <Loader />}
                  {error && <Message>{error}</Message>}
                  {Myorders && Myorders.length
                    ? Myorders.map(
                        (myorder) => (
                          console.log(myorder),
                          (
                            <tr key={myorder._id}>
                              <td className="p-1">
                                {myorder.orderItems[0]._id}
                              </td>
                              <td className="p-1">
                                {myorder.orderItems[0].name}
                              </td>

                              <td className="p-1">$ {myorder.totalPrice}</td>
                              <td className="p-1">
                                {myorder.isDelivered === false ? (
                                  <Badge variant="info">processing</Badge>
                                ) : (
                                  <Badge variant="success">
                                    {myorder.paymentResult.status}
                                  </Badge>
                                )}
                              </td>
                              <td className="p-0">
                                <Link to={"/order-review/" + myorder._id}>
                                  <Badge variant="warning">view</Badge>
                                </Link>
                              </td>
                            </tr>
                          )
                        )
                      )
                    : null}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
