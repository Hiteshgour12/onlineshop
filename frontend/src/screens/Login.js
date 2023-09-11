import React, { useState} from "react";
import axios from "axios";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col,Button, Form } from "react-bootstrap";

/* COMPONENTS */
// import Message from "../components/Message";
// import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
// import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
// import { login } from "../actions/userActions";

export default function Login() {
  /* STATE */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  const submitHandler = async e => {
    e.preventDefault();
    // debugger;
          var data = JSON.stringify({
            "email": email,
            "password": password
          });
          var config = {
            method: 'post',
            url: 'http://127.0.0.1:8080/userlogin/',  
            headers: { 
              'Content-Type': 'application/json'
            },      
            data : data
            };
            
            axios(config)
            .then(function (response) {
            //   debugger;
            setMessage(JSON.stringify(response.data))
            console.log(JSON.stringify(response.data));

            setEmail("");
            setPassword("");
            })
            .catch(function (error) {
            //   debugger;
              console.log(error);
            });
            
            
        }

  return (
    <FormContainer>
      <h1>Sign In</h1>
{/* 
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />} */}
      {message && <p variant="danger">{message}</p>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer ?{" "}
          <Link to={"/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

// export default LoginScreen;
