import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function product({ product }) {
  // console.log(product);
  return (
    <>
      <Card className="possible_card mb-3">
        <div className="imgHolder">
          <Link to={"/detail/" + product._id}>
            <Card.Img variant="top" src={product.productImg} />
          </Link>
        </div>

        <Card.Body className="text-center">
          <Card.Title>{product.name}</Card.Title>

          <Card.Text>$ {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
