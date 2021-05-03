import React, { useEffect } from "react";
import {
  Button,
  Col,
  ListGroup,
  Image,
  Card,
  Row,
  ListGroupItem,
  Container,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Message from "../layout/Message";
import { useSelector, useDispatch } from "react-redux";
import CheckoutProcess from "../layout/CheckoutProcess";
import { createAnOrder } from "../../redux/actions/orderActions";

export default function PlaceOrderPage() {
  const cart = useSelector((state) => state.cart);

  console.log("Cart: ",cart)
 
  // calculate price
  
  const totalPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);


  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  console.log("cart", cart);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (success) {
      history.push("/order/" + order._id);
      // eslint-disable-next-line
    }
  }, [history, success, order]);
  const placeOrderHandler = () => {
    // items from cart
    dispatch(
      createAnOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        totalPrice: totalPrice,
      })
    );
  };



  return (
    <Container>
      <CheckoutProcess stp1 stp2 stp3 stp4 />
      <Row>
        <Col md={8}>
          <ListGroup >
            <ListGroupItem>
              <h3>shipping</h3>
              <p>
                {cart.shippingAddress.address} <br />
                {cart.shippingAddress.city}
              </p>
            </ListGroupItem>
            <ListGroup>
              {" "}
              <h4>Payment-Method</h4>
              <strong> {cart.paymentMethod}</strong>
            </ListGroup>
            <ListGroupItem>
              <h3>Order Items</h3>

              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
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
              {error && <Message variant="danger">{error}</Message>}
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                >
                  Place order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
