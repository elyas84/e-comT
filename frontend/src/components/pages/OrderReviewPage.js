import React, { useEffect, useState } from "react";
import {
  Col,
  ListGroup,
  Image,
  Card,
  Row,
  ListGroupItem,
  Container,
} from "react-bootstrap";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import Message from "../layout/Message";
// import { cleanCart } from "../../redux/actions/cartAction";
import { useSelector, useDispatch } from "react-redux";
import { ORDER_PAY_REST } from "../../redux/constences/orderConstence";

import {
  getOrderDetails,
  orderPaid,
  orderEmpty,
} from "../../redux/actions/orderActions";
import Loader from "../layout/Loader";
export default function OrderReviewPage({ match, history }) {
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

  const orderedPay = useSelector((state) => state.orderedPay);
  const { loading: payLoading, success } = orderedPay;

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
    if (!order || success) {
      dispatch({
        type: ORDER_PAY_REST,
      });
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
        dispatch(orderEmpty());
      }
    }
  }, [dispatch, orderId, success, order]);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  console.log("order: ", order);

  const successPaymentHandler = (paymentResult) => {
    // console.log("Payment Result: ", paymentResult);

    dispatch(orderPaid(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Container>
      <h1>Order ID: {order._id}</h1>
      {order ? (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h4>Personal information</h4>
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.email}</p>
                <p> {order.shippingAddress.adress} </p>
                <p>{order.shippingAddress.city}</p>
              </ListGroupItem>
              {order.isDelivered === true ? (
                <Message variant="success">Order is Delivered.</Message>
              ) : (
                <Message variant="warning">Order is not delivered.</Message>
              )}
              <ListGroupItem>
                <h3>Order Items</h3>

                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.productImg}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={"/detail/" + item.product}>
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
                <p>Method : {order.paymentMethod}</p>
                {order.isPaid ? (
                  <Message variant="success">
                    payment is done at{" "}
                    {order.paidAt.substring(0, 10) +
                      "-" +
                      order.paidAt.substring(12, 16)}
                  </Message>
                ) : (
                  <Message variant="warning">
                    Please, complete your payment.
                  </Message>
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
                    <Col>$ {order.totalPrice}</Col>
                  </Row>
                </ListGroupItem>
                {!order.isPaid && (
                  <ListGroupItem>
                    {payLoading && <Loader></Loader>}
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
    </Container>
  );
}
