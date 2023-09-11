import React, { useState } from "react";
import axios from "axios";

/* REACT ROUTER */
// import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import {Button, Form, Row } from "react-bootstrap";

/* COMPONENTS */
// import Message from "../components/Message";
// import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
// import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
// import { register } from "../actions/userActions";

export default function Add_categoryScreen() {
  // /* STATE */
const [name, setName] = useState('');
// const [brand, setBrand] = useState('');
// const [subcategory_id, setSubcategory_id] = useState('');
// const [product_detail, setProduct_detail] = useState('');
// const [product_price, setProduct_price] = useState('');
// const [product_image, setProduct_image] = useState('');
// const [categories_id, setCategories_id] = useState('');


  // const dispatch = useDispatch();

  // /* SETTING UP REDIRECT */
  // const redirect = location.search ? location.search.split("=")[1] : "/";

  // /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  // const userRegister = useSelector((state) => state.userRegister);

  // const { userInfo, loading, error } = userRegister;

  // /* REDIRECTING AN ALREADY LOGGED IN USER, AS WE DON'T WANT THEM TO SEE THE LOGIN PAGE */
  // useEffect(() => {
  //   if (userInfo) {
  //     history.push(redirect);
  //   }
  // }, [history, userInfo, redirect]);

  // /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    var data = JSON.stringify({
      "name": name
    });
    
    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8080/product/category/',
      headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNjAwNTI5LCJpYXQiOjE2NzA1NzE3MjksImp0aSI6IjIzMWNkNjUwNDA1NzQ0NzFhZTM1NTJiODYwNzM2MGMyIiwidXNlcl9pZCI6NH0.Ly9TLChN1tx_tesj0iF6XV6PWQOP87JxXY30Tae7X4w', 
          'Content-Type': 'application/json'
        },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  //   /* DISABLE SUBMIT IF PASSWORDS DON'T MATCH */
  //   if (password !== confirmPassword) {
  //     setMessage("Passwords do not match");
  //   } else {
  //     /* FIRING OFF THE ACTION CREATORS USING DISPATCH FOR REGISTER */
  //     dispatch(register(name, email, password));
  //   }
  };

  return (
    <Row>
    <FormContainer>
      <h1>Add Category</h1>
      {/* {message} */}
      {/* {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />} */}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter Product Name"
            value={name }
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

      
        {/* <Form.Group controlId="product_image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            required
            type="file"
            placeholder="Image"
            value={product_image}
            onChange={(e) => setProduct_image(e.target.value)}
          />
        </Form.Group> */}


        

        <Button type="submit" variant="primary" className="mt-3">
          Add Category
        </Button>
      </Form>

    </FormContainer>
    </Row>
  );
}

// export default RegisterScreen;
