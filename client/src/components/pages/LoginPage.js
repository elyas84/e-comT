import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { register, login } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";

import Loader from "../layout/Loader";
import Message from "../layout/Message";
export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
const userLogin = useSelector((state) => state.userLogin);
const { userDetail,loading, error } = userLogin;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");


   useEffect(() => {
     if (userDetail && userDetail.name) {
       history.push("/profile");
     }
   }, [userDetail, history]);
    const loginHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, pass));
      setEmail("");
      setPass("");
    };
  return (
    <Container>
      <Row className="py-5">
        <Col lg={6} className="bg-light m-auto">
          <div className="py-5">
            <h2>Login</h2>
            Already our customer? <br />
            <br />
            <span>
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat
              vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit
              amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
              placerat eleifend leo.
            </span>
            <hr />
          </div>
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

            <Form.Group controlId="pass">
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
        </Col>
      </Row>
    </Container>
  );
}
