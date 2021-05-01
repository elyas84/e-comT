import React, { useEffect } from "react";
import {
  Col,
  Container,
  
  Row,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Message from "../layout/Message";
import { useSelector, useDispatch } from "react-redux";
import { createAnOrder } from "../../redux/actions/orderActions";

export default function Checkout3Page() {

    const cart = useSelector((state) => state.cart);

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
        }
      }, [history, success, order]);
      
// console.log(order._id);

        const plceOrderHandler = () => {
          dispatch(
            createAnOrder({
              orderItems: cart.orderItems,
              shippingAddress: cart.shippingAddress,
              paymentMethod: cart.paymentMethod,
              price: cart.price,
              totalPrice: totalPrice,
            })
          );
        };
  return (
    <>
      <Container>
        <Row className="py-5">
          <Col lg={9} className="m-auto">
            <>
              <>
                <h1 className="py-3">Checkout - Order review</h1>
                <div className="nav flex-column flex-sm-row nav-pills">
                  <Link
                    to="/checkout-1"
                    className="nav-link flex-sm-fill text-sm-center"
                  >
                    {" "}
                    <i className="fa fa-map-marker"> </i>Address
                  </Link>

                  <Link
                    to="/checkout-2"
                    className="nav-link flex-sm-fill text-sm-center"
                  >
                    {" "}
                    <i className="fa fa-money"> </i>Payment Method
                  </Link>
                  <Link
                    to="#"
                    className="nav-link flex-sm-fill text-sm-center active"
                  >
                    {" "}
                    <i className="fa fa-eye"> </i>Order Review
                  </Link>
                </div>
                <Row>
                  <Col md={8}>
                    <ListGroup variant="flush">
                      <ListGroupItem>
                        <h3>shipping</h3>
                        <p>
                          {cart.shippingAddress.address}
                          <br />
                          {cart.shippingAddress.city}
                          <br />
                          {cart.shippingAddress.name}
                          <br />
                          {cart.shippingAddress.email}
                        </p>
                      </ListGroupItem>

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
                </Row>
                {/* /.content*/}
                <div className="box-footer d-flex justify-content-between">
                  <Link to="/checkout-2" className="btn btn-outline-secondary">
                    <i className="fa fa-chevron-left" />
                    Back to payment method
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={plceOrderHandler}
                  >
                    Place an order
                    <i className="fa fa-chevron-right" />
                  </button>
                </div>
              </>
            </>
            {/* /.box*/}
          </Col>
          {/* /.col-lg-9*/}
          <div className="col-lg-3">
            <div id="order-summary" className="card">
              <div className="card-header">
                <h3 className="mt-4 mb-4">Order summary</h3>
              </div>
              <div className="card-body">
                <p className="text-muted">
                  Shipping and additional costs are calculated based on the
                  values you have entered.
                </p>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr className="total">
                        <td>Total</td>
                        <th>$ {totalPrice}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Row>
        {/* <Message>Payment has been done</Message> */}
      </Container>
    </>
  );
}


 