import React, { useEffect } from "react";
import { Col, Container, Row, ListGroup, Table, Badge } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
export default function ProfilePage() {
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
                    <h2>Latest Order</h2>
                  </Col>
                </Row>

                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>delivered</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-1">154564878979</td>
                      <td className="p-1">John</td>
                      <td className="p-1">$ 150.00</td>
                      <td className="p-1">
                        <Badge variant="info">Ok</Badge>
                      </td>
                      <td className="p-0">
                        <Link to="/customer-order">
                          <Badge variant="danger">No</Badge>
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
                    <h2>My Latest orders</h2>
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
