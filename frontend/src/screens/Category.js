import React, { useState, useEffect } from "react";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import _ from 'lodash';
/* REACT ROUTER */
// import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import {Button, Col, Form, Row,Table } from "react-bootstrap";

/* COMPONENTS */
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
// import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
// import { register } from "../actions/userActions";

export default function Add_category() {
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
  const [categori, setCategory] = useState();
  var data = '';
  useEffect(()=>{
    get();
  },[])

  const get =()=>{
  var config = {
    method: 'get',
    url: 'http://127.0.0.1:8000/product/cat/',
    headers: { 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMjA1NjgyLCJpYXQiOjE2NzIxMTkyODIsImp0aSI6IjA1N2I0MzMzOTdkYzRhN2Q5OWRkYzJiMjc1NzRlZTY1IiwidXNlcl9pZCI6MX0.D8RyQpRraXCGGUNXl1R64AeTOzzGQ8Zgxug-Aeykio4',
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    const orderby = _.orderBy(response.data.category,'id','desc');
    setCategory(orderby)
    console.log(JSON.stringify(response.data.category));
  })
  .catch(function (error) {
    console.log(error);
  });
}

  const submitHandler = (e) => {
    e.preventDefault();

    var data = JSON.stringify({
      "name": name
    });
    
    
    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/product/category/',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMjA1NjgyLCJpYXQiOjE2NzIxMTkyODIsImp0aSI6IjA1N2I0MzMzOTdkYzRhN2Q5OWRkYzJiMjc1NzRlZTY1IiwidXNlcl9pZCI6MX0.D8RyQpRraXCGGUNXl1R64AeTOzzGQ8Zgxug-Aeykio4',
        'Content-Type': 'application/json'
        },
      data : data
    };
    
    
    axios(config)
    .then(function (response) {
      get();
      console.log(JSON.stringify(response.data));
      setName("")
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
    <Row style={{marginLeft:'-10vh'}}>
     
      <Col md={3}>
        <h2>Add Category</h2>

        {/* {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />} */}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
          Add Category
          </Button>
        </Form>
      </Col >

      
      <Col md={9}>
      <h2>Category</h2>
      <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Name</th>
                {/* <th>Date</th>
                <th>Total</th> */}
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
            {categori&&categori.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  {/* <td>{item.category_id}</td> */}

                  {/* <td>
                    {item.createdAt ? item.createdAt.substring(0, 10) : null}
                  </td>
                  <td>${item.totalPrice}</td> */}
                  <td>    
                    <LinkContainer to={`editcustomerlist/${item.id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
            </td>
            <td>
                    <LinkContainer to={`editcustomerlist/${item.id}`}>
                    <Button
                      variant="danger"
                      className="btn-sm"
                    //   onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                    </LinkContainer>

            </td>
                </tr>
              ))}
            </tbody>
          </Table>
    
    </Col>
    </Row>
  );
}

// export default RegisterScreen;
