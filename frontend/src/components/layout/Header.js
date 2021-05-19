import React, { useState, useEffect } from "react";
import {
  Nav,
  Navbar,
  Container,
  Badge,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {
  orderEmpty,
} from "../../redux/actions/orderActions";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";

export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const orderDetail = useSelector((state) => state.orderDetail);
  const { order } = orderDetail;
    const orderedPay = useSelector((state) => state.orderedPay);
    const { success } = orderedPay;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (success) {
      dispatch(orderEmpty());
    }
  }, [success, dispatch]);

  const seachHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push("/search/" + keyword);
      setKeyword("");
    } else {
      history.push("/");
    }
  };
  return (
    <>
      {userDetail && userDetail.name && !userDetail.isAdmin ? (
        <Navbar bg="dark" variant="dark" className="p-0">
          <Nav className="ml-auto px-3">
            <LinkContainer
              to="/"
              style={{ color: "white", fontWeight: "bold" }}
            >
              <Nav.Link> Hi, {userDetail.name} </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link>My profile </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/" onClick={logoutHandler}>
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>
      ) : userDetail && userDetail.name && userDetail.isAdmin ? (
        <Navbar bg="dark" variant="dark" className="p-1">
          <Nav className="ml-auto px-3">
            <LinkContainer
              to="/"
              style={{ color: "white", fontWeight: "bold" }}
            >
              <Nav.Link>Hi, {userDetail.name}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link>My profile </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/" onClick={logoutHandler}>
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>
      ) : (
        <Navbar bg="dark" variant="dark" className="p-0">
          <Nav className="ml-auto px-3">
            <LinkContainer to="/login">
              <Nav.Link>Login </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Register </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>
      )}

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
            <Link to="/cart">
              <i
                className="fas fa-shopping-cart"
                style={{ fontSize: "1rem" }}
              ></i>
              {order && order.isPaid ? (
                <Badge pill variant="success">
                  OK
                </Badge>
              ) : (
                <Badge variant="info" style={{ fontSize: "1rem" }}>
                  {" "}
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </Badge>
              )}
            </Link>
            <Form inline onSubmit={seachHandler}>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                value={keyword}
                name="searchKeyword"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
            {/* <Search /> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
