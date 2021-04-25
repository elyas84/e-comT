import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Checkout1Page() {
  return (
    <>
      <>
        <Container>
          <Row className="py-5">
            <Col lg={9}>
              <>
                <Form>
                  <h1 className="py-5">Checkout - Address</h1>
                  <div className="nav flex-column flex-md-row nav-pills text-center">
                    <Link
                      to="/checkout-1"
                      className="nav-link flex-sm-fill text-sm-center active"
                    >
                      {" "}
                      <i className="fa fa-map-marker"> </i>Address
                    </Link>

                    <Link
                      to="#"
                      className="nav-link flex-sm-fill text-sm-center disabled"
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
                        <div className="form-group">
                          <label htmlFor="firstname">Firstname</label>
                          <input
                            id="firstname"
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="form-group">
                          <label htmlFor="lastname">Lastname</label>
                          <input
                            id="lastname"
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </Col>
                    </Row>
                    {/* /.row*/}
                    <Row>
                      <Col lg={6}>
                        <div className="form-group">
                          <label htmlFor="street">Street</label>
                          <input
                            id="street"
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </Col>
                    </Row>
                    {/* /.row*/}
                    <Row>
                      <Col lg={3} md={6}>
                        <div className="form-group">
                          <label htmlFor="zip">ZIP</label>
                          <input
                            id="zip"
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </Col>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="phone">Telephone</label>
                          <input
                            id="phone"
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            id="email"
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </Row>
                    {/* /.row*/}
                  </div>
                  <div className="box-footer d-flex justify-content-between">
                    <Link to="/cart" className="btn btn-outline-secondary">
                      <i className="fa fa-chevron-left" />
                      Back to cart
                    </Link>
                    <Link  to="/checkout-2"className="btn btn-primary">
                      Continue to Payment Method
                      <i className="fa fa-chevron-right" />
                    </Link>
                  </div>
                </Form>
              </>
              {/* /.box*/}
            </Col>
            {/* /.col-lg-9*/}
            <Col lg={3}>
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
            </Col>
            {/* /.col-lg-3*/}
          </Row>
        </Container>
      </>
    </>
  );
}
