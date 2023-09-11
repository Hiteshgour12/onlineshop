import React, { useState, useEffect } from "react";
import axios from "axios";
/* REACT ROUTER */
// import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import {Button, Col, Row,Table } from "react-bootstrap";

/* COMPONENTS */
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
// import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
// import { register } from "../actions/userActions";

export default function OrderDetails({match}) {

    const id = match.params.id;

    const paidHandler= (id) =>{
        if (window.confirm("Are you sure you want to make order is paid ?")){
      var config = {
        method: 'put',
        url: `http://127.0.0.1:8000/orders/ordersispaid/${id}`,
        headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMzgwMTY1LCJpYXQiOjE2NzIyOTM3NjUsImp0aSI6ImU0MzEwNDUyM2Q3MTRlNWI5MjEyM2M0OTRhMDQyYWYzIiwidXNlcl9pZCI6MX0.aHFkztX_N7qYp8I2OqBiihnRwO0WQ483JBAZgDa0Fmw',
        }
      };
      
        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        get();
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    }


    const deliveryHandler= (id) =>{
        if (window.confirm("Are you sure you want to make Order is Delivered?")){
      var config = {
        method: 'put',
        url: `http://127.0.0.1:8000/orders/orderdeliver/${id}`,
        headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMzgwMTY1LCJpYXQiOjE2NzIyOTM3NjUsImp0aSI6ImU0MzEwNDUyM2Q3MTRlNWI5MjEyM2M0OTRhMDQyYWYzIiwidXNlcl9pZCI6MX0.aHFkztX_N7qYp8I2OqBiihnRwO0WQ483JBAZgDa0Fmw',
        }
      };
      
        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        get();
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    }

  // /* STATE */
// const [name, setName] = useState('');


  // /* HANDLERS */
  const [item, setItem] = useState();
  const [paymentmethod, setPaymentMethod] = useState();
  const [taxPrice, setTaxPrice] = useState();
  const [shippingPrice, setShippingPrice] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [isPaid, setIsPaid] = useState();
  const [paidAt, setPaidAt] = useState();
  const [isDeliver, setIsDeliver] = useState();
  const [deliveredAt, setDeliveredAt] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [user, setUser] = useState();
  const [oid,setId]= useState();
  const [address, setAddress] = useState();
  const [city , setCity] = useState();
  const [country , setCountry] = useState();
  const [postalCode, setPostalCode] = useState();

  useEffect(()=>{
    get();
  },[])

  const get =()=>{
    var config = {
        method: 'get',
        url: `http://127.0.0.1:8000/orders/order/${id}`,
        headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMzgwMTY1LCJpYXQiOjE2NzIyOTM3NjUsImp0aSI6ImU0MzEwNDUyM2Q3MTRlNWI5MjEyM2M0OTRhMDQyYWYzIiwidXNlcl9pZCI6MX0.aHFkztX_N7qYp8I2OqBiihnRwO0WQ483JBAZgDa0Fmw',
        }
      };
      
      axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        
        setId(response.data.order.id);
        setPaymentMethod(response.data.order.paymentMethod);
        setTaxPrice(response.data.order.taxPrice);
        setShippingPrice(response.data.order.shippingPrice);
        setTotalPrice(response.data.order.totalPrice);
        setIsPaid(response.data.order.isPaid);
        setPaidAt(response.data.order.paidAt);
        setIsDeliver(response.data.order.isDeliver);
        setDeliveredAt(response.data.order.deliveredAt);
        setCreatedAt(response.data.order.createdAt);
        setUser(response.data.order.user);
        // console.log(JSON.stringify(response.data.order));
        setItem(response.data.items);
        // console.log(JSON.stringify(response.data.items));
        setAddress(response.data.shipping_address.address)
        setCity(response.data.shipping_address.city)
        setCountry(response.data.shipping_address.country)
        setPostalCode(response.data.shipping_address.postalCode)
        // console.log(JSON.stringify(response.data.shipping_address));
      })
      .catch(function (error) {
        console.log(error);
      });
      
  

}

  
  return (
    <Row>
     
      {/* <Col md={3}>
        
      </Col > */}

      
      <Col >
      <h2>Orders Details</h2>
      &nbsp;
      



      
      
      <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr><h4>Order</h4>
               
              </tr>
            </thead>

            <tbody>
            <tr><td>Customer</td><td>{user}</td><td></td></tr>
            <tr><td>Payment Method</td><td>{paymentmethod}</td><td></td></tr>
            <tr><td>Tax </td><td>{taxPrice}</td><td></td></tr>
            <tr><td>Shipping Price</td><td>{shippingPrice}</td><td></td></tr>
            <tr><td>Total Price</td><td>{totalPrice}</td><td></td></tr>
        
            <tr><td>Paid </td>
            {isPaid?
                <td style={{color:"green"}}><i className="fas fa-check"></i></td>
                :
                <td style={{color:"red"}}><i className="fas fa-times"></i></td>
                  }
                  <td>{isPaid?<Button variant="success" >Paid</Button>:<Button variant="danger"onClick={() => paidHandler(oid)}>Unpaid</Button>}</td></tr>
            <tr><td>Paid On</td><td>{paidAt? paidAt.substring(0, 10) : null}</td><td></td></tr>
            <tr><td>Delevered </td>
            {isDeliver?
                <td style={{color:"green"}}><i className="fas fa-check"></i></td>
                :
                <td style={{color:"red"}}><i className="fas fa-times"></i></td>
                }
                <td>{isDeliver?<Button variant="success">Delevered</Button>:<Button variant="danger" onClick={() => deliveryHandler(oid)}>Not Delevered</Button>}</td></tr>
            <tr><td>Dilevered On</td><td>{deliveredAt? deliveredAt.substring(0, 10) : null}</td><td></td></tr>
            <tr><td>Ordered On</td><td>{createdAt? createdAt.substring(0, 10) : null}</td><td></td></tr>
            </tbody>
            </Table>
            &nbsp;
            <Table striped bordered hover responsive className="table-sm">
            <thead>
            <tr><h4>Items</h4></tr>
            <tr>
            {/* <th>Image</th> */}
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            </tr>
            </thead>
            <tbody>
              {item&&item.map((ord) => (
                <tr key={ord.id}>
                  {/* <td>{ord.id}</td> */}
                  
                  {/* <td>{ord.image}</td> */}
                  <td>{ord.name}</td>
                  <td>{ord.qty}</td>
                  <td>{ord.price}</td>
                 
                  
                </tr>
              ))}
            </tbody>
          </Table>
          &nbsp;

            <Table striped bordered hover responsive className="table-sm">
            <thead>
            <tr><h4>Shpping Address</h4></tr>
            <tr>
            {/* <th>Image</th> */}
            <th>Address</th>
            <th>City</th>
            <th>country</th>
            <th>postal-Code</th>
            </tr>
            </thead>
            <tbody>
             
                <tr>
                  <td>{address}</td>
                  <td>{city}</td>
                  <td>{country}</td>
                  <td>{postalCode}</td>    
                 
                  
                </tr>
             
            </tbody>
          </Table>

            
    
    </Col>
    </Row>
  );
}

// export default RegisterScreen;
