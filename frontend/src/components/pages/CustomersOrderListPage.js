import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  ListGroup,
  Table,
  Badge,
  Modal,
  Button,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import Message from "../layout/Message";
import Loader from "../layout/Loader";
import {
  getOrderList,
  deliverid,
  deleteOrder,
} from "../../redux/actions/orderActions";
export default function CustomersOrderListPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const ordersList = useSelector((state) => state.ordersList);
  const { orderlist, loading, error } = ordersList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const { deleteSuccess } = orderDelete;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { updateSuccess } = orderDeliver;
  console.log("orderlist: ", orderlist);
  useEffect(() => {
    if (!userDetail.isAdmin) {
      history.push("/");
    } else {
      dispatch(getOrderList());
    }
  }, [userDetail, history, dispatch, updateSuccess, deleteSuccess]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [targetOrder, setTargetOrder] = useState("");

  return (
    <Container className="py-5">
      {userDetail.isAdmin ? (
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
                    <h2>customer order list</h2>
                  </Col>
                </Row>

                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Order</th>

                      <th className="p-2">Customer</th>
                      <th className="p-2">Total</th>
                      <th className="p-2">Paid</th>
                      <th className="p-2">delivered</th>
                      <th className="p-2">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && <Loader></Loader>}
                    {error && <Message>{error}</Message>}
                    {orderlist && orderlist.length ? (
                      orderlist.map((order, index) => (
                        <tr key={order._id}>
                          <td className="p-2">{index + 1}</td>
                          <Link to={"/order-review/" + order._id}>
                            <td className="p-2">{order.orderItems[0]._id}</td>
                          </Link>

                          <td className="p-2">{order.costumer.name}</td>
                          <td className="p-2">$ {order.totalPrice}</td>
                          {order.isPaid === true ? (
                            <td className="p-2">
                              <Badge variant="success">Ok</Badge>
                            </td>
                          ) : (
                            <td className="p-2">
                              <Badge variant="danger">No</Badge>
                            </td>
                          )}
                          {order.isDelivered === true ? (
                            <td className="p-2">
                              <Badge variant="success">Delivered</Badge>
                            </td>
                          ) : (
                            <td
                              className="p-2 text-center"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                dispatch(deliverid(order._id));
                              }}
                            >
                              <Badge variant="info">Processing</Badge>
                            </td>
                          )}

                          <i
                            className="fas fa-trash"
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() => {
                              setTargetOrder(order);
                              handleShow();
                            }}
                          ></i>
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Delete Order</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <p style={{ color: "red" }}>
                                Are you sure to delete the ORDER ?{" "}
                              </p>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="light" onClick={handleClose}>
                                Close
                              </Button>
                              <Button
                                variant="outline-danger"
                                onClick={() => {
                                  dispatch(deleteOrder(targetOrder._id));

                                  setShow(false);
                                }}
                              >
                                Ok
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </tr>
                      ))
                    ) : (
                      <Message>There no orders.</Message>
                    )}
                  </tbody>
                </Table>
              </Col>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row className="py-5">
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
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <h2>My orders</h2>
                    <p>Your orders on one place.</p>
                    <span>
                      If you have any questions, please feel free to{" "}
                      <Link to="/contact">contact us</Link>, our customer
                      service center is working for you 24/7.
                    </span>
                  </Col>
                </Row>
                <hr />

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
                        <Link to="/customer-order">
                          <Badge variant="success">view</Badge>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
}
