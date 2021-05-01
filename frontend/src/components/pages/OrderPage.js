import React, { useEffect, useState } from "react";
import {
  Col,
  ListGroup,
  Image,
  Card,
  Row,
  ListGroupItem,
} from "react-bootstrap";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import Message from "../layout/Message";
// import { cleanCart } from "../../redux/actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import { ORDER_PAY_REST } from "../../redux/constences/orderConstence";

import { getOrderDetails, orderPaid } from "../../redux/actions/orderActions";
import Loader from "../layout/Loader";
export default function OrderPage({ match, history }) {
  const orderId = match.params.id;

  // console.log("ordId: ", orderId)
  // SDK FOR PAYPALL

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  // const history = useHistory();

  const orderDetail = useSelector((state) => state.orderDetail);
  const { order, error, loading } = orderDetail;
  // console.log("order", order.data.paymentResult);
  console.log("order: ", order);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const cart = useSelector((state) => state.cart);
  const totalPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      // console.log("Client:id ", clientId)
      // Creating a new script

      const script = document.createElement("script");
      //PayPal getway API
      script.type = "text/javascript";
      script.src = "https://www.paypal.com/sdk/js?client-id=" + clientId + "";
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    // addPayPalScript()
    if (!order || successPay) {
      dispatch({
        type: ORDER_PAY_REST,
      });
      dispatch(getOrderDetails(orderId));
    } else if (!order.data.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, history]);

  // console.log("order: ", order);

  const successPaymentHandler = (paymentResult) => {
    console.log("Payment Result: ", paymentResult);

    dispatch(orderPaid(orderId, paymentResult));
  };

  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <h1>Order ID: {order.data._id}</h1>
      {order.data ? (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h4>shipping</h4>
                <p>Name: {order.data.shippingAdress.name}</p>
                <p>Email: {order.data.shippingAdress.email}</p>
                <p>Address: {order.data.shippingAdress.adress} </p>
                <p>City: {order.data.shippingAdress.city}</p>
              </ListGroupItem>

              <ListGroupItem>
                <h3>Order Items</h3>

                <ListGroup variant="flush">
                  {order.data.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} X $ {item.price} = ${" "}
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                <h4>Payment Method</h4>
                <p>Method : {order.data.paymentMethod}</p>
                {order.data.isPaid ? (
                  <Message variant="success">payment is done</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>Order Summary</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Total</Col>
                    <Col>$ {totalPrice}</Col>
                  </Row>
                </ListGroupItem>
                {!order.data.isPaid && (
                  <ListGroupItem>
                    {loadingPay && <Loader></Loader>}
                    {!sdkReady ? (
                      <Loader></Loader>
                    ) : (
                      <PayPalButton
                        amount={totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : (
        <Message>No order found</Message>
      )}
    </>
  );
}
