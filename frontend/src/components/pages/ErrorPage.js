import React from 'react'
import { Container, Row ,Col} from 'react-bootstrap';
import {Link} from 'react-router-dom'
export default function ErrorPage() {
    return (
      <>
        <Container>
          <Row>
            <Col lg={12}>
            
              <Row>
                <Col md={6} className="mx-auto">
                  <div className=" py-5">
                    <h1 className="text-center py-3">
                      E-shop Community
                    </h1>
                    <h3>We are sorry - this page is not here anymore</h3>
                    <h4 className="text-muted py-3 text-center">Error 404 - Page not found</h4>
                  
                    <p className="text-center">
                      <Link to="/" className="btn btn-primary">
                        <i className="fa fa-home" /> Go to Homepage
                      </Link>
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
}
