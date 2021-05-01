import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveShippingAddress } from "../../redux/actions/cartActions";
export default function Checkout1Page() {
const dispatch = useDispatch();
 const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress }= cart
  console.log(cart)
 
  const [name, setName] = useState(shippingAddress.name);
  const [email, setEmail] = useState(shippingAddress.email);
  const [adress, setAdress] = useState(shippingAddress.adress);
  const [city, setCity] = useState(shippingAddress.city);

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(saveShippingAddress({ name, email, adress, city }));
      history.push("/checkout-2");
    };
  return (
    <>
      <>
        <Container>
          <Row className="py-5">
            <Col lg={9} className="m-auto">
              <>
                <>
                  <h1 className="py-5">Checkout - Address</h1>
                  <div className="nav flex-column flex-md-row nav-pills text-center">
                    <Link
                      to="/checkout-1"
                      className="nav-link flex-sm-fill text-sm-center active"
                    >
                      {" "}
                      <i className="fa fa-map-marker"> </i>Address
                    </Link>

                    <Link
                      to="#"
                      className="nav-link flex-sm-fill text-sm-center disabled"
                    >
                      {" "}
                      <i className="fa fa-money"> </i>Payment Method
                    </Link>
                    <Link
                      to="#"
                      className="nav-link flex-sm-fill text-sm-center disabled"
                    >
                      {" "}
                      <i className="fa fa-eye"> </i>Order Review
                    </Link>
                  </div>
                  <div className=" py-3">
                    <Row>
                      <Col lg={8} className="m-auto">
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={name}
                              required
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                          </Form.Group>
                          <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              required
                              type="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            />
                          </Form.Group>

                          <Form.Group controlId="adress">
                            <Form.Label>Shipping Adress</Form.Label>
                            <Form.Control
                              type="text"
                              required
                              value={adress}
                              onChange={(e) => {
                                setAdress(e.target.value);
                              }}
                            />
                          </Form.Group>
                          <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              type="text"
                              required
                              value={city}
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                            />
                          </Form.Group>

                          {/* <Button variant="primary" type="submit">
                            Continue
                          </Button> */}

                          <div className="box-footer d-flex justify-content-between">
                            <Link
                              to="/cart"
                              className="btn btn-outline-secondary"
                            >
                              <i className="fa fa-chevron-left" />
                              Back to cart
                            </Link>
                            <Button  className="btn btn-primary" type="submit">
                              Continue to Payment Method
                              <i className="fa fa-chevron-right" />
                            </Button>
                          </div>
                        </Form>
                      </Col>
                    </Row>
                    {/* /.row*/}
                    <Row></Row>
                    {/* /.row*/}
                  </div>
                  {/* <div className="box-footer d-flex justify-content-between">
                    <Link to="/cart" className="btn btn-outline-secondary">
                      <i className="fa fa-chevron-left" />
                      Back to cart
                    </Link>
                    <Link to="/checkout-2" className="btn btn-primary">
                      Continue to Payment Method
                      <i className="fa fa-chevron-right" />
                    </Link>
                  </div> */}
                </>
              </>
              {/* /.box*/}
            </Col>
          </Row>
        </Container>
      </>
    </>
  );
}
