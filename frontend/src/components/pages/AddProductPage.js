import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Container, Row, ListGroup, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
import { createProduct } from "../../redux/actions/productActions";
import { PRODUCT_CREATE__REST } from "../../redux/constences/productConstence";
import axios from "axios";
export default function AddProductPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userDetail } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const { success, product } = productCreate;

  // useEffect(() => {

  //  }, [success, dispatch]);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(0);
  const [image, setImage] = useState("");

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

  useEffect(() => {
    if (!userDetail.isAdmin) {
      history.push("/");
    }
    if (success) {
      window.alert(product.name + " is created");
      dispatch({
        type: PRODUCT_CREATE__REST,
      });
      history.push("/admin/products-list");
    }
  }, [userDetail, history, success, dispatch,product]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name: name,
        price: price,
        createdBy: userDetail._id,
        productImg: image,
        brand: brand,
        countInStock: inStock,
        description: description,
        category: category
      })
    );
    console.log("image:", image);

    setName("");
    setBrand("");
    setDescription("");
    setPrice(0);
    setInStock(0);
    setImage("");
    setCategory("")
  };

  return (
    <>
      <Container className="py-5">
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
                    <h2>Add new product</h2>
                  </Col>
                </Row>

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
                      {/* <Form.File
                        id="productImage"
                        label="product img"
                        data-browse="Upload"
                        custom
                        name="productImage"
                        value={image}
                        onChange={uploadImgHandler}
                      /> */}
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

                  <Button variant="primary" type="submit">
                    Create
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
