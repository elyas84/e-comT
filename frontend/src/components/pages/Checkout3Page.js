import React from "react";
import { Col, Container, Form, Row, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../layout/Message";
export default function Checkout3Page() {
  return (
    <>
      <Container>
        <Row className="py-5">
          <Col lg={9}>
            <>
              <Form>
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
                    to="/checkout-3"
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
                      <td>
                       <span className="">2</span>
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
                {/* /.content*/}
                <div className="box-footer d-flex justify-content-between">
                  <Link to="/checkout-2" className="btn btn-outline-secondary">
                    <i className="fa fa-chevron-left" />
                    Back to payment method
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Place an order
                    <i className="fa fa-chevron-right" />
                  </button>
                </div>
              </Form>
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
                      <tr>
                        <td>Order subtotal</td>
                        <th>$446.00</th>
                      </tr>
                      <tr className="total">
                        <td>Total</td>
                        <th>$456.00</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Row>
        <Message>Payment has been done</Message>
      </Container>
    </>
  );
}
