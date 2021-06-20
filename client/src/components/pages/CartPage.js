import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  Card,
  Form,
  ListGroupItem,
  Container,
  Modal,
} from "react-bootstrap";
import { addToCart, deleteFromCart } from "../../redux/actions/cartActions";
import Message from "../layout/Message";

export default function CartPage({ match, location }) {

const orderDetail = useSelector((state) => state.orderDetail);
const { order } = orderDetail;

  //location is like ? 4
  const history = useHistory();
  const product_ID = match.params.id;
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;
  // console.log(quantity)

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;


  // console.log("cartItems", cartItems);
  useEffect(() => {
    if (product_ID) {
      dispatch(addToCart(product_ID, quantity));
    }
  }, [dispatch, product_ID, quantity]);

  const checkoutHandler = () => {
    history.push("/shipping");

    // if user not logged in, user can redirected login page or shipping page!
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [targetProd, setTargetProd] = useState("");

  return (
    <Container>
      <Row className="py-5">
        <Col md={8}>
          <h1 className="py-3">Shoping Cart</h1>

          {cartItems.length ? (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.productImg}
                        alt="procutImg"
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={"/detail/" + item.product}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) => {
                          // setQty(e.target.value);

                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          );
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((item) => (
                          <option key={item + 1} value={item + 1}>
                            {item + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        onClick={() => {
                          setTargetProd(item.product);
                          handleShow();
                        }}
                      >
                        delete
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Delete Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p style={{ color: "red" }}>
                            Are you sure to delete {item.name} ?{" "}
                          </p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="light" onClick={handleClose}>
                            Close
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => {
                              dispatch(deleteFromCart(item.product));

                              setShow(false);
                            }}
                          >
                            Ok
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )  : (
            <Message>Your cart is empty</Message>
          )}
         
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <p>
                  Total Item:
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </p>
                <p>Total price: </p>${" "}
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
