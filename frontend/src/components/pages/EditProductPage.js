import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Container, Row, ListGroup, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import {
  productListDetail,
  updateProduct,
} from "../../redux/actions/productActions";
import { PRODUCT_UPDATE_REST } from "../../redux/constences/productConstence";
import axios from "axios";
import Message from "../layout/Message";
import Loader from "../layout/Loader";
export default function EditProductPage({ match }) {
  const product_ID = match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const producutDetail = useSelector((state) => state.producutDetail);
  const { loading, product, error } = producutDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { updateSuccess } = productUpdate;

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [image, setImage] = useState("");
    const [category, setCategory] = useState("");

  useEffect(() => {
    if (!userDetail.isAdmin) {
      history.push("/");
    }
  }, [userDetail, history]);

  useEffect(() => {
    if (updateSuccess) {
       window.alert(product.name + " is updated");
       dispatch({
         type: PRODUCT_UPDATE_REST,
       });
       history.push("/admin/products-list");
    }
    if (!product.name || product._id !== product_ID) {
     dispatch(productListDetail(product_ID));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setInStock(product.countInStock);
      setDescription(product.description);
      setCategory(product.category);
    }
  }, [dispatch, product_ID, product, updateSuccess, history]);

  // Uploading img
  const [upload, setUpload] = useState(false);
  // Uplaod image function
  const uploadImgHandler = async (e) => {
    const imgFile = e.target.files[0]; // single file
    const formData = new FormData();
    formData.append("productImage", imgFile);
    setUpload(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post("/api/upload", formData, config);
      console.log("Some Img: ", response.data);
      setImage(response.data);
      setUpload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: product_ID,
        name: name,
        price: price,
        productImg: image,
        brand: brand,
        countInStock: inStock,
        description: description,
        category: category,
      })
    );

    console.log("img: ", image);
  };
  return (
    <>
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
                    <h2>Edit Product</h2>
                  </Col>
                </Row>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                <Form onSubmit={submitHandler}>
                  <Row>
                    <Col>
                      <Form.Group controlId="productName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                          type="text"
                          value={brand}
                          onChange={(e) => {
                            setBrand(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId="description">
                        <Form.Label>description</Form.Label>
                        <Form.Control
                          type="text"
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId="productName">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          type="text"
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="price">
                        <Form.Label>price</Form.Label>
                        <Form.Control
                          type="number"
                          value={price}
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group controlId="countInStock">
                        <Form.Label>count In Stock</Form.Label>
                        <Form.Control
                          type="number"
                          value={inStock}
                          onChange={(e) => {
                            setInStock(e.target.value);
                          }}
                        />
                      </Form.Group>{" "}
                      <br />
                      <Form.Group>
                        <label id="image-file"></label>
                        <Form.File
                          id="image-file"
                          label="Upload Img"
                          name="image"
                          custom
                          onChange={uploadImgHandler}
                        ></Form.File>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="info" type="submit">
                    Update
                  </Button>
                </Form>
              </Col>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
