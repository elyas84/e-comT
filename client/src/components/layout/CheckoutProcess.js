import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"; // samething with Link
export default function CheckoutProcess({ stp1, stp2, stp3, stp4 }) {
  return (
    <Nav className="justify-content-center mb-5">
      <Nav.Item>
        {stp1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Login</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {stp2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {stp3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {stp4 ? (
          <LinkContainer to="/placeOrder">
            <Nav.Link>placeOrder</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>placeOrder</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}
