import React from "react";
import {
  Nav,
  Navbar,
  FormControl,
  Form,
  Container,
  Badge,
} from "react-bootstrap";
import { Link} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";

export default function Header() {
  const dispatch = useDispatch();
  
  const userLogin = useSelector((state) => state.userLogin);
  const {userDetail } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      <Nav className="navTop justify-content-end px-5 ">
        {userDetail && userDetail.name && !userDetail.isAdmin ? (
          <>
            <LinkContainer
              to="/"
              style={{ color: "black", fontWeight: "bold" }}
            >
              <Nav.Link> Hi, {userDetail.name} |</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link>My profile |</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/" onClick={logoutHandler}>
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          </>
        ) : userDetail && userDetail.name && userDetail.isAdmin ? (
          <>
            <LinkContainer to="/" style={{ color: "black", fontWeight: "bold" }}>
              <Nav.Link>Hi, {userDetail.name}|</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link>My profile |</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/" onClick={logoutHandler}>
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          </>
        ) : (
          <>
            <LinkContainer to="/login">
              <Nav.Link>Login |</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Register |</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
          </>
        )}
      </Nav>

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
              <LinkContainer to="/products">
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
