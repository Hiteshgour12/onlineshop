import React, { useState, useEffect } from "react";
import axios from "axios";
// import { LinkContainer } from "react-router-bootstrap";
// import _ from 'lodash';
/* REACT ROUTER */
// import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Col, Row,Table } from "react-bootstrap";

/* COMPONENTS */
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
// import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
// import { register } from "../actions/userActions";

export default function UserProfile() {
  // /* STATE */


  // /* HANDLERS */
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  
  useEffect(()=>{
    get();
  },[])

  const get =()=>{
    var config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/user/',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMjAyMzI3LCJpYXQiOjE2NzIxMTU5MjcsImp0aSI6IjdmM2I2ZDM1YmI1NTQ0OTY4MjAyYTM1NDA4YmJjYzc0IiwidXNlcl9pZCI6MX0.ukY6AFzZidczMJEk1HGXdTFNM_du-yOa_qWqfsylKEc',
    }
    };
    
    axios(config)
    .then(function (response) {
  
      setName(response.data.full_name);
      setEmail(response.data.email);
      setContact(response.data.contact);
      setCity(response.data.city);
      setAddress(response.data.address);
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

  

  return (
    <Row>
     
      <Col md={3}>
        <h2>Profile</h2>
        <tr></tr>
        <tr><th><h4>{name}</h4></th></tr>
        <tr>{name}</tr>
        <tr><th>{contact}</th></tr>
        <tr><th>{city}</th></tr>
        <tr><th>{address}</th></tr>
        <tr><th>{email}</th></tr>
  
      </Col >

      
      <Col md={9}>
        <h2>My Orders</h2>
        <Table striped responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
       </Table>   
     </Col>
    </Row>
  );
}

// export default RegisterScreen;


// input field in reactjs?
// handleEmailChange: function(e) {
//    this.setState({email: e.target.value});
// },
// handlePasswordChange: function(e) {
//    this.setState({password: e.target.value});
// },
// render : function() {
//       return (
//         <form>
//           <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
//           <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
//           <button type="button" onClick={this.handleLogin}>Login</button>
//         </form>);
// },
// handleLogin: function() {
//     console.log("EMail: " + this.state.email);
//     console.log("Password: " + this.state.password);
// }


// var ExampleForm = React.createClass({
//   mixins: [React.addons.LinkedStateMixin],
//   getInitialState: function() {
//     return {email: '', password: ''};
//   },
//   handleLogin: function() {
//     console.log("EMail: " + this.state.email);
//     console.log("Password: " + this.state.password);
//   },
//   render: function() {
//     return (
//       <form>
//         <input type="text" valueLink={this.linkState('email')} />
//         <input type="password" valueLink={this.linkState('password')} />
//         <button type="button" onClick={this.handleLogin}>Login</button>
//       </form>
//     );
//   }
// });


