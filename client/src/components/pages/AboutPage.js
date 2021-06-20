import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function AboutPage() {
  return (
    <Container>
      <h3 className="py-3">About Developer</h3>
      <h5 className="py-3">
        Full stack develoeper with more then two years of work experience
      </h5>
      <h5 className="py-3">Web Tech</h5>
      <ul>
        <li>HTML/CSS</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>Express</li>
        <li>Mongoose</li>
        <li>Node</li>
        <li>and more</li>
      </ul>
          <hr/>
      <h4 className="py-3">Contact</h4>
  
      <Row>
        <Col>
          <div className="mb-3">
            <i className="fas fa-mobile-alt" style={{fontSize:"1.5rem"}}></i>{" "}
            <span style={{ fontWeight: "bold" }}>
              &nbsp;&nbsp; +46 7078 18446
            </span>
          </div>

          <div>
            <i className="fas fa-envelope" style={{fontSize:"1.5rem"}}></i>
            <span style={{ fontWeight: "bold" }}>
              &nbsp;&nbsp;&nbsp;&nbsp;elyas84@gmail.com
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
