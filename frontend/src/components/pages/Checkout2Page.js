import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
export default function Checkout2Page() {
    return (
      <>
        <Container>
          <Row className="py-5">
            <Col lg={9}>
              <Form>
                <h1 className="py-5">Checkout - Payment method</h1>
                <div className="nav flex-column flex-sm-row nav-pills">
                  <Link to="/checkout-1" className="nav-link flex-sm-fill text-center">
           
                    <i className="fa fa-map-marker"> </i>Address
                  </Link>

                  <Link
                    to="/checkout-2"
                    className="nav-link flex-sm-fill text-sm-center active"
                  >
                    {" "}
                    <i className="fa fa-money"> </i>Payment Method
                  </Link>
                  <Link
                    to="#"
                    className="nav-link flex-sm-fill text-sm-center disabled"
                  >
                    {" "}
                    <i className="fa fa-eye"> </i>Order Review
                  </Link>
                </div>

                <div className=" py-3">
                  <Row>
                    <Col md={6}>
                      <div className="box payment-method">
                        <h4>Paypal</h4>
                        <p>We like it all.</p>
                        <div className="box-footer">
                          <input
                            type="radio"
                            name="payment"
                            defaultValue="payment1"
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="box-footer d-flex justify-content-between">
                  <Link to="/checkout-1" className="btn btn-outline-secondary">
                    <i className="fa fa-chevron-left" />
                    Back to Shipping Method
                  </Link>
                  <Link to="/checkout-3" className="btn btn-primary">
                    Continue to Payment Method
                    <i className="fa fa-chevron-right" />
                  </Link>
                </div>
              </Form>
              {/* /.box*/}
            </Col>
            {/* /.col-lg-9*/}
            <div className="col-lg-3">
              <div id="order-summary" className="card">
                <div className="card-header">
                  <h3 className="mt-4 mb-4">Order summary</h3>
                </div>
                <div className="card-body">
                
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
            {/* /.col-lg-3*/}
          </Row>
        </Container>
      </>
    );
}
