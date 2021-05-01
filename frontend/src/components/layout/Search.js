import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
export default function Search() {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push("/search/" + keyword);
    } else {
      history.push("/");
      // <Message>There is no match! please, try again!</Message>
    }
  };
  return (
    <Container className="mt-2">
      <Form onSubmit={submitHandler}>

        <Form.Control
          type="text"
          placeholder="search"
     
          value={keyword}
          name="searchKeyword"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        ></Form.Control>
      </Form>
    </Container>
  );
}
