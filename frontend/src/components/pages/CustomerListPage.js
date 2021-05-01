import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Container, Row, ListGroup, Table, Modal,Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout, getUsers, deleteUser } from "../../redux/actions/userActions";
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
  
  const userDelete = useSelector((state) => state.userDelete);
  const { DeleteSsuccess } = userDelete;

  useEffect(() => {
    if (!userDetail.isAdmin) {
      history.push("/");
    } else {
      dispatch(getUsers());
    }
  }, [userDetail, history, dispatch, DeleteSsuccess]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const [targetUser, setTargetUser] = useState("");
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
                  {users && users.length
                    ? users.map((user, index) =>
                        user.isAdmin ? null : (
                          <tr key={user._id}>
                            <td className="p-2">{index}</td>
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">+45678787987</td>
                            <td className="p-0 text-center">
                              <i
                                className="fas fa-trash"
                                style={{ cursor: "pointer", color: "red" }}
                                onClick={() => {
                                  setTargetUser(user);
                                  handleShow();
                                }}
                              ></i>
                              <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Delete User</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <p style={{ color: "red" }}>
                                    Are you sure to delete {targetUser.name} ?{" "}
                                  </p>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button variant="light" onClick={handleClose}>
                                    Close
                                  </Button>
                                  <Button
                                    variant="outline-danger"
                                    onClick={() => {
                                      dispatch(deleteUser(targetUser._id));

                                      setShow(false);
                                    }}
                                  >
                                    Ok
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </td>
                          </tr>
                        )
                      )
                    : null}
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
