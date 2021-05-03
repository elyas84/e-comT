import React, { useState } from "react";
import FormContainer from "../layout/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import CheckoutProcess from "../layout/CheckoutProcess";
import { useHistory } from "react-router-dom";
import { savePaymentMethod } from "../../redux/actions/cartActions";

export default function PaymentPage() {
  const dispatch = useDispatch();

  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutProcess stp1 stp2 stp3 />
      <h1>Payment Method</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
        </Form.Group>
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
        <Button variant="primary" type="submit" className="mt-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
