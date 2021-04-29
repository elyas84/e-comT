import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Container, Row, ListGroup, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout, getUsers } from "../../redux/actions/userActions";
import Loader from "../layout/Loader";
import Message from "../layout/Message";
export default function CustomerListPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  console.log("users: ", users);

  useEffect(() => {
    if (!userDetail.isAdmin) {
      history.push("/");
    } else {
      dispatch(getUsers());
    }
  }, [userDetail, history, dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };
  return (
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
                  <h2>Customers</h2>
                </Col>
              </Row>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="p-2">Nr</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Phone</th>
                    <th className="p-2">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && <Loader />}
                  {error && <Message>{error}</Message>}
                  {users && users.length ? (
                    users.map((user,index) =>
                      user.isAdmin ? null : (
                        <tr key={user._id}>
                          <td className="p-2">{index}</td>
                          <td className="p-2">{user.name}</td>
                          <td className="p-2">{user.email}</td>
                          <td className="p-2">+45678787987</td>
                          <td className="p-0 text-center">
                            <i className="fas fa-trash "></i>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    null
                  )}
                </tbody>
              </Table>
            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
