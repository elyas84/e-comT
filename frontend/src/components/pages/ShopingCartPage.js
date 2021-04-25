import React from "react";
import {
  Container,
  Table,
  Image,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
export default function ShopingCartPage() {
  return (
    <Container>
      <h3 className="py-5">Shoping Cart</h3>
      <p>You currently have 3 item(s) in your cart.</p>
      <Row>
        <Col>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th colSpan={2}>Product</th>
                <th>Quantity</th>
                <th>Unit price</th>
                <th>Total</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tr">
                <td className="table_img p-0">
                  <Link to="/detail">
                    <Image src="images/drone1.jpg"></Image>
                  </Link>
                </td>
                <td>
                  <Link to="/detail">drone1</Link>
                </td>
                <td className="p-0">
                  <Form.Control as="select" custom>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </td>
                <td>$123.00</td>
                <td>$246.00</td>
                <td>
                  <Link to="#">
                    <i className="fa fa-trash-o" />
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
          <Row className="cart_row p-3">
            <Col lg={6}>
              <Link to="/category">
                {" "}
                <Button className="p-2" variant="outline-secondary">
                  <i className="fa fa-chevron-left" />
                  Continue shopping
                </Button>
              </Link>
            </Col>

            <Col lg={6}>
              <Link to="/checkout-1">
                {" "}
                <Button className="p-2" variant="outline-secondary">
                  <i className="fa fa-chevron-left" />
                  Proceed to checkout <i className="fa fa-chevron-right" />
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col lg={3} mg={4} sm={12}>
          <h3>Order Summary</h3>
          <ListGroup>
            <ListGroup.Item>
              Order subtotal <p className="subPrice"> $ 446</p>
            </ListGroup.Item>
            <ListGroup.Item>
              Total <p className="subPrice"> $446</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
