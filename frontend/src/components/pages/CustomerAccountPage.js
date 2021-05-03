import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Container, Row, ListGroup, Form, Button } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux'
import {
  logout,
  profileUpdate,
  getUserDetails,
} from "../../redux/actions/userActions";
import Message from "../layout/Message";
import Loader from "../layout/Loader";
import { USER_PROFILE_UPDATE_REST } from "../../redux/constences/userConstence";
export default function CustomerAccountPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  // user must be logged in before!!!
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail, loginSuccess } = userLogin;
  // Getting user Details

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  // updating process
  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { updateSuccess } = userProfileUpdate;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState(null);
  const [logSucc, setLogSucc] = useState(loginSuccess);

  // console.log(user);
  useEffect(() => {
    if (!userDetail.name) {
      history.push("/login");
    } else {
      if (!user || !user.name || updateSuccess || logSucc) {
        dispatch({ type: USER_PROFILE_UPDATE_REST });

        dispatch(getUserDetails("profile"));
        setLogSucc(false);
      } else {
        setName(user.name);
        setEmail(user.email);
      }
      if (updateSuccess) {
        window.alert("Profile succefully updated!");
      }
    }
  }, [dispatch, userDetail, user, updateSuccess, logSucc, history]);

  const updateHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setMessage("passwords do not match!");
    } else {
  dispatch(profileUpdate({id: user._id, name, email, password}));
    }
 
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };


  return (
    <Container>
      <Row className="m-auto">
        <Col lg={3}>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              Customer section
            </ListGroup.Item>
            <Link to="/customer-orders">
              <ListGroup.Item as="li">My orders</ListGroup.Item>
            </Link>

            {/* <Link to="/order-details">
              <ListGroup.Item as="li">Order Details</ListGroup.Item>
            </Link> */}
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
          <Row className="p-2">
            <Col>
              <h2>My account</h2>
              <p>
                Change your personal details or your password here. <br />
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={8} md={6} sm={12}>
              {loading && <Loader />}
              {error && <Message>{error}</Message>}
              {message && (
                <Message variant="danger">Password do not match!</Message>
              )}
              <Form style={{ width: "50%" }} onSubmit={updateHandler}>
                <Form.Group controlId="updateName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="updateEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="newPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="comfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPass}
                    onChange={(e) => {
                      setConfirmPass(e.target.value);
                    }}
                  />
                </Form.Group>
                <Button variant="info" type="submit" block>
                  Save
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
