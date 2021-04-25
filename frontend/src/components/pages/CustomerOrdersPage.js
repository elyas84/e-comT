import React from "react";
import { Col, Container, Row, ListGroup, Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function CustomerOrdersPage() {
  return (
    <Container>
      <Row className="py-5">
        <Col lg={3}>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              Customer section
            </ListGroup.Item>
            <Link to="/customer-orders">
              <ListGroup.Item as="li">My orders</ListGroup.Item>
            </Link>

            <Link to="/customer-account">
              <ListGroup.Item as="li">My account</ListGroup.Item>
            </Link>
            <Link to="/">
              <ListGroup.Item as="li">Logout</ListGroup.Item>
            </Link>
          </ListGroup>
        </Col>
        <Col>
          <Row>
            <Col
              lg={12}
            
            >
              <Row>
                <Col>
                  <h2>My orders</h2>
                  <p>Your orders on one place.</p>
                  <span>
                    If you have any questions, please feel free to{" "}
                    <Link to="/contact">contact us</Link>, our customer service
                    center is working for you 24/7.
                  </span>
                </Col>
              </Row>
              <hr />

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-1">154564878979</td>
                    <td className="p-1">22/06/2013</td>
                    <td className="p-1">$ 150.00</td>
                    <td className="p-1">
                      <Badge variant="info">on hold</Badge>
                    </td>
                    <td className="p-0">
                      <Link to="/customer-order">
                        <Badge variant="success">view</Badge>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
