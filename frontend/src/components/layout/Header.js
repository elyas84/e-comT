import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
export default function Header() {
  // MODAL
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Nav className="navTop justify-content-end px-5 ">
        <LinkContainer to="/">
          <Nav.Link onClick={handleShow}>Login |</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/register">
          <Nav.Link>Register |</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/contact">
          <Nav.Link>Contact</Nav.Link>
        </LinkContainer>
      </Nav>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Customer Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="">
              Log in
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
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
