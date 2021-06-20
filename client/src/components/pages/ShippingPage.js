import React, { useState } from "react";
import FormContainer from "../layout/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

import CheckoutProcess from "../layout/CheckoutProcess";
import { useHistory } from "react-router-dom";
import { saveShippingAddress } from "../../redux/actions/cartActions";

export default function ShippingPage() {

   const dispatch = useDispatch();

   const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [name, setName] = useState(shippingAddress.name);
  const [email, setEmail] = useState(shippingAddress.email);
  const [address, setAddress] = useState(shippingAddress.adress);
  const [city, setCity] = useState(shippingAddress.city);

 

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ name, email, address, city }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutProcess stp1 stp2 />
      <h1>Shipping</h1>
   
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

        <Form.Group controlId="address">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type="text"
            required
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
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
        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
