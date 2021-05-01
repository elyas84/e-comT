import React, { useState } from "react";
import { Col, Container, Form, Row ,Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { savePaymentMethod } from "../../redux/actions/cartActions";
export default function Checkout2Page() {
    const dispatch = useDispatch();

    const history = useHistory();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress) {
      history.push("/checkout-1");
    }

    const [paymentMethod, setPaymentMethod] = useState("payPal");

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      history.push("/checkout-3");
    };

  return (
    <>
      <Container>
        <Row className="py-5">
          <Col lg={9} className="m-auto">
            <>
              <h1 className="py-5">Checkout - Payment method</h1>
              <div className="nav flex-column flex-sm-row nav-pills">
                <Link
                  to="/checkout-1"
                  className="nav-link flex-sm-fill text-center"
                >
                  <i className="fa fa-map-marker"> </i>Address
                </Link>

                <Link
                  to="/checkout-2"
                  className="nav-link flex-sm-fill text-sm-center active"
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
              <Row>
                <Col lg={8} className="m-auto">
                  <Form onSubmit={submitHandler}>
                    <Form.Group></Form.Group>
                    <Col>
                      <Form.Check
                        type="radio"
                        label="PayPal"
                        id="paypal"
                        name="paymentMethod"
                        value={paymentMethod}
                        checked
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                        }}
                      ></Form.Check>
                    </Col>
                    <Col>
                      <Form.Check
                        type="radio"
                        label="Something"
                        id="Something"
                        name="paymentMethod"
                        value={paymentMethod}
                        checked
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                        }}
                      ></Form.Check>
                    </Col>
                    <Col>
                      <Form.Check
                        type="radio"
                        label="Radnom"
                        id="radnom"
                        name="paymentMethod"
                        value={paymentMethod}
                        checked
                        onChange={(e) => {
                          setPaymentMethod(e.target.value);
                        }}
                      ></Form.Check>
                    </Col>
                    {/* <Button variant="primary" type="submit" className="mt-3">
                      Continue
                    </Button> */}

                    <div className="box-footer d-flex justify-content-between">
                      <Link
                        to="/checkout-1"
                        className="btn btn-outline-secondary"
                      >
                        <i className="fa fa-chevron-left" />
                        Back to Shipping Method
                      </Link>
                      <Button type="submit" className="btn btn-primary">
                        Continue to Payment Method
                        <i className="fa fa-chevron-right" />
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </>
            {/* /.box*/}
          </Col>
        </Row>
      </Container>
    </>
  );
}
