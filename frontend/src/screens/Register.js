import React, { useState } from "react";
import axios from "axios";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, Button, Form } from "react-bootstrap";

/* COMPONENTS */
// import Message from "../components/Message";
// import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
// import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
// import { register } from "../actions/userActions";

export default function Register() {
  // /* STATE */
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [contact, setContact] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState("");


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
    console.log("refresh prevented");


    var data = JSON.stringify({
      "full_name":full_name,
      "email": email,
      "password": password,
      "password2": password2,
      "contact": contact,
      "city": city,
      "gender": gender,
      "address": address,
      "message":message
    });
    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/register/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      setMessage(JSON.stringify(response.data))
      console.log(JSON.stringify(response.data));


      setName("");
      setEmail("");
      setContact("");
      setCity("");
      setGender("");
      setAddress("");
      setPassword("");
      setPassword2("");

      
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  return (
    <FormContainer>
      <h1>Register</h1>
{/* {message} */}
      {message && <p variant="danger">{message}</p>}
      {/* {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />} */}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter Name"
            value={full_name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="contact">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            required
            type="contact"
            placeholder="Phone ..."
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            required
            type="gender"
            placeholder="Enter gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>



        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>

        
        

        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account ?{" "}
          <Link to=  "/login">
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

// export default RegisterScreen;
