import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  ListGroup,
  Table,
  Modal,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import {
  getProductList,
  deleteProduct,
} from "../../redux/actions/productActions";
import Loader from "../layout/Loader";
import Message from "../layout/Message";
// import Product from "../layout/Product";
export default function ProductListPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  console.log(products);

  const productDelete = useSelector((state) => state.productDelete);
  const { DeleteSuccess } = productDelete;

  useEffect(() => {
    if (!userDetail.isAdmin) {
      history.push("/");
    } else {
      dispatch(getProductList());
    }
  }, [userDetail, history, DeleteSuccess]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [targetProd, setTargetProd] = useState("");
  return (
    <Container>
      <Row className="">
        <Col lg={3}>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              Customer section
            </ListGroup.Item>
            <Link to="/admin/orderlist">
              <ListGroup.Item as="li">Customers orders</ListGroup.Item>
            </Link>
            <Link to="/admin/customers-list">
              <ListGroup.Item as="li">Customer list</ListGroup.Item>
            </Link>
            <Link to="/admin/products-list">
              <ListGroup.Item as="li">Products list</ListGroup.Item>
            </Link>
            <Link to="/admin/new-product">
              <ListGroup.Item as="li">New Product</ListGroup.Item>
            </Link>
            {/* <Link to="/admin/edit-product">
              <ListGroup.Item as="li">Edit Product</ListGroup.Item>
            </Link> */}
            <Link to="/admin/account">
              <ListGroup.Item as="li">My account</ListGroup.Item>
            </Link>
            <Link to="#">
              <ListGroup.Item as="li" onClick={logoutHandler}>
                Logout
              </ListGroup.Item>
            </Link>
          </ListGroup>
        </Col>
        <Col>
          <Row>
            <Col lg={12}>
              <Row>
                <Col>
                  <h2>Product List</h2>
                </Col>
              </Row>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="p-2">Name</th>
                    <th className="p-2">brand</th>
                    <th className="p-2">price</th>
                    <th className="p-2">countInStock</th>
                    <th className="p-2">Edit</th>
                    <th className="p-2">Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && <Loader />}
                  {error && <Message>{error}</Message>}

                  {products && products.length
                    ? products.map((product) => (
                        <tr key={product._id}>
                        <Link to={"/detail/"+product._id}>
                               <td className="p-2">{product.name}</td>
                        </Link>
                     
                          <td className="p-2">{product.brand}</td>
                          <td className="p-2">{product.price}</td>
                          <td className="p-2">{product.countInStock}</td>

                          <td className="p-1">
                            <Link
                              to={"/admin/" + product._id + "/edit-product"}
                              style={{ color: "green" }}
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                          </td>
                          <td className="p-1">
                            <i
                              className="fas fa-trash"
                              style={{ cursor: "pointer", color: "red" }}
                              onClick={() => {
                                setTargetProd(product);
                                handleShow();
                              }}
                            ></i>
                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Delete User</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <p style={{ color: "red" }}>
                                  Are you sure to delete {targetProd.name} ?{" "}
                                </p>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="light" onClick={handleClose}>
                                  Close
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  onClick={() => {
                                    dispatch(deleteProduct(targetProd._id));

                                    setShow(false);
                                  }}
                                >
                                  Ok
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </td>
                        </tr>
                      ))
                    : null}
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
