import React, { useState, useEffect } from "react";
import {
  Nav,
  Navbar,
  FormControl,
  Form,
  Button,
  Container,
  Modal,
  Badge,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
// import Loader from "../layout/Loader";
// import Message from "../layout/Message";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";

export default function Header() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userDetail, error } = userLogin;

  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");

  // MODAL
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // useEffect(() => {
  //   if (!userDetail) {
  //     history.push("/");
  //   }
  //   else {
  //         setShow(false);
  //         history.push("/customer-orders")
  //   }

  // }, [userDetail, history]);

  // const loginHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(login(email, pass));
  //   setEmail("");
  //   setPass("");
  // };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      <Nav className="navTop justify-content-end px-5 ">
        {userDetail && userDetail.name && !userDetail.isAdmin ? (
          <>
            <LinkContainer
              to="#"
              style={{ color: "green", fontWeight: "bold" }}
            >
              <Nav.Link> Hi, {userDetail.name}|</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/customer-orders">
              <Nav.Link>My profile |</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/" onClick={logoutHandler}>
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          </>
        ) : userDetail && userDetail.name && userDetail.isAdmin ? (
          <>
            <LinkContainer to="#" style={{ color: "red", fontWeight: "bold" }}>
              <Nav.Link>Hi, {userDetail.name}|</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/customer-orders">
              <Nav.Link>My profile |</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/" onClick={logoutHandler}>
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          </>
        ) : (
          <>
            {/* <LinkContainer to="/">
              <Nav.Link onClick={handleShow}>Login |</Nav.Link>
            </LinkContainer> */}
            <LinkContainer to="/register">
              <Nav.Link>Login |</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
          </>
        )}
      </Nav>

      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Customer Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          <Form onSubmit={loginHandler}>
            <Form.Group controlId="email1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Form>
        </Modal.Body>
      </Modal> */}
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              {" "}
              <h2>E-Shop</h2>{" "}
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/mobile">
                <Nav.Link>Mobile</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/computer">
                <Nav.Link>Computer</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/category">
                <Nav.Link>All Product</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Form>

            <Link to="/cart">
              <i
                className="fas fa-shopping-cart"
                style={{ fontSize: "2rem" }}
              ></i>{" "}
              <Badge variant="info">2</Badge>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
