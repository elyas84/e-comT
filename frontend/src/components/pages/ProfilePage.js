import React, { useEffect } from "react";
import { Col, Container, Row, ListGroup, Table, Badge } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { getMyOrderList, getOrderList } from "../../redux/actions/orderActions";
import Message from "../layout/Message";
import Loader from "../layout/Loader";
export default function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const userOrderList = useSelector((state) => state.userOrderList);
  const { Myorders, loading, error } = userOrderList;
  // console.log(Myorders)
  useEffect(() => {
    if (!userDetail.name) {
      history.push("/");
    }
    dispatch(getMyOrderList());
  }, [userDetail, history, dispatch]);

    // useEffect(() => {
    //   if (!userDetail.isAdmin) {
    //     history.push("/");
    //   }
    //   dispatch(getOrderList());
    // }, [userDetail, history, dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };
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
            <Row>
              <Col lg={12}>
                <Row>
                  <Col>
                    <h2>Admin Dashboard</h2>
                  </Col>
                </Row>

                <hr />
                <Row>
                  <Col lg={6} className="m-auto">
                        <iframe
                  src="https://giphy.com/embed/l3q2WMhNcyFOWP280"
                  width="380"
                  height="380"
                  frameBorder="0"
                  className="giphy-embed"
                  allowFullScreen
                ></iframe>
                  </Col>
                </Row>

            
             
              </Col>
              {/* <Col></Col> */}
            </Row>
          </Col>
        </Row>
      ) : (
        <Row className="">
          <Col lg={3}>
            <ListGroup as="ul">
              <ListGroup.Item as="li" active>
                Customer section
              </ListGroup.Item>
              <Link to="/customer-orders">
                <ListGroup.Item as="li">My orders</ListGroup.Item>
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
                    <h2>My Latest orders</h2>
                    <p>Your orders on one place.</p>
                    <span>
                      If you have any questions, please feel free to{" "}
                      <Link to="/contact">contact us</Link>, our customer
                      service center is working for you 24/7.
                    </span>
                  </Col>
                </Row>

                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Paid</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && <Loader />}
                    {error && <Message>{error}</Message>}
                    {Myorders && Myorders.length
                      ? Myorders.map((myorder) => (
                          <tr key={myorder._id}>
                            <td className="p-1">
                              {myorder.orderItems[0].name}
                            </td>
                            {myorder.isPaid ? (
                              <td className="p-1">
                                <Badge variant="success">Ok</Badge>
                              </td>
                            ) : (
                              <td className="p-1">
                                <Badge variant="danger">No</Badge>
                              </td>
                            )}

                            <td className="p-1">$ {myorder.totalPrice}</td>
                            <td className="p-1">
                              {myorder.isDelivered === false ? (
                                <Badge variant="info">processing</Badge>
                              ) : (
                                <Badge variant="info">
                                  {myorder.paymentResult.status}
                                </Badge>
                              )}
                            </td>
                            <td className="p-0">
                              <Link to={"/order-review/" + myorder._id}>
                                <Badge variant="success">view</Badge>
                              </Link>
                            </td>
                          </tr>
                        ))[Myorders.length - 1]
                      : null}
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
