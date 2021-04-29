import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { USER_REG_REST } from "../../redux/constences/userConstence";
import Loader from "../layout/Loader";
import Message from "../layout/Message";
export default function RegisterPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userRegister = useSelector((state) => state.userRegister);
  const { registerSuccess, userDetail, error, loading } = userRegister;
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [warnngMsg, setWarningMsg] = useState(null);


  useEffect(() => {
    if (registerSuccess) {
      dispatch({
        type: USER_REG_REST,
      });
      window.alert(userDetail.name + " is registered, please Login");
      history.push("/login");
    }
  }, [userDetail, dispatch, registerSuccess, history]);


  const registerHandler = (e) => {
    e.preventDefault();
    if (pass1 !== pass2) {
      setWarningMsg("passwords do not match!");
    } else {
      dispatch(register(regName, regEmail, pass1));
    }
    setRegName("");
    setRegEmail("");
    setPass1("");
    setPass1("");
  };

  return (
    <Container>
      <Row className=" justify-content-center">
        <Col lg={5} className="bg-light mr-3">
          <div className="py-5">
            <h2>New account</h2>
            <span>
              Not our registered customer yet?
              <br />
              <br />
              With registration with us new world of fashion, fantastic
              discounts and much more opens to you! The whole process will not
              take you more than a minute! <br />
              <br />
              If you have any questions, please feel free to contact us, our
              customer service center is working for you 24/7.
            </span>
            <hr />
          </div>

          {loading && <Loader />}
          {error && <Message>{error}</Message>}
          {warnngMsg && (
            <Message variant="danger">Password do not match!</Message>
          )}
          <Form onSubmit={registerHandler}>
            <Form.Group controlId="name">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                type="text"
                value={regName}
                onChange={(e) => {
                  setRegName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={regEmail}
                onChange={(e) => {
                  setRegEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group
              controlId="pass1"
              value={pass1}
              onChange={(e) => {
                setPass1(e.target.value);
              }}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group
              controlId="pass2"
              value={pass2}
              onChange={(e) => {
                setPass2(e.target.value);
              }}
            >
              <Form.Label>Comfirm Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
       
      </Row>
    </Container>
  );
}
