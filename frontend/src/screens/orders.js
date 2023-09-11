import React, { useState, useEffect } from "react";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import _ from 'lodash';

/* REACT ROUTER */
// import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import {Button, Col, Form, Row,Table} from "react-bootstrap";



export default function Orders() {
  // /* STATE */


  // /* HANDLERS */
  const [order, setOrder] = useState();

  useEffect(()=>{
    get();
  },[])

  const get =()=>{
    var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/orders/allorders/',
        headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyNDY2NjYzLCJpYXQiOjE2NzIzODAyNjMsImp0aSI6ImM4YmVlOTJhNDU3ODRhYjlhYjYwZjQ4ODI5YzkzM2MwIiwidXNlcl9pZCI6MX0.C4xWzsHskk6DO_ky0ATHX-IQ8Nvz_EvUoIwVV3jqOBo',
        }
      };
      

      axios(config)
      .then(function (response) {
        const orderby = _.orderBy(response.data,'id','desc');
        setOrder(orderby)
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      
  

}
const [start, setStart] = useState();
const [end, setEnd] = useState();

const submitHandler = (e) => {
    e.preventDefault();
    var data = JSON.stringify({
        "startdate": start,
        "enddate": end
      });
      
      var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/product/dateorder/',
         
        headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyNDY2NjYzLCJpYXQiOjE2NzIzODAyNjMsImp0aSI6ImM4YmVlOTJhNDU3ODRhYjlhYjYwZjQ4ODI5YzkzM2MwIiwidXNlcl9pZCI6MX0.C4xWzsHskk6DO_ky0ATHX-IQ8Nvz_EvUoIwVV3jqOBo',
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        setOrder(response.data.Orders)
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });


}

  return (
    <Row>
     
      
      
      <Col >
      <h2>Orders</h2>
      <Form onSubmit={submitHandler} className="mr-2" style={{ height:'50vh',width:'30vh',float:'left' }}>
      <input  name="startdate"  type="date" 
        // disabled={  } 
        value={ start } 
        className="form-control"  onChange={(e) => setStart(e.target.value)} 
        />
        &nbsp;
      <input  name="enddate"  type="date" 
        // disabled={  } 
        value={ end } 
        className="form-control"  onChange={(e) => setEnd(e.target.value)} 
        />
        <Button type="submit" variant="primary" className="mt-2">
          Apply
        </Button>
        </Form>

      <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Payment Method</th>
                <th>Is Paid</th>
                <th>Is Deliver</th>
                <th>Date</th>
                <th>Total</th>
                {/* <th>Edit</th> */}
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {order&&order.map((ord) => (
                <tr key={ord.id}>
                  <td>{ord.id}</td>
                  <td>{ord.paymentMethod}</td>
                  {ord.isPaid?
                <>
                <td style={{color:"green"}}><i className="fas fa-check"></i></td>
                </>:<>
                <td style={{color:"red"}}><i className="fas fa-times"></i></td>
                </>  
                }
                                    
                  <td>{ord.isDeliver?
                <>
                <td style={{color:"green"}}><i className="fas fa-check"></i></td>
                </>:<>
                <td style={{color:"red"}}><i className="fas fa-times"></i></td>
                </>}</td>
                  <td>{ord.createdAt ? ord.createdAt.substring(0, 10) : null}</td>
                  <td>${ord.totalPrice}</td>
                  {/* <td>    
                    <LinkContainer to={`editcustomerlist/${order.id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
            </td> */}
            <td>
                    <LinkContainer to={`/detail/${ord.id}`}>
                    <Button
                      variant="primary"
                      className="btn-sm"
                    //   onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-info-circle"></i>&nbsp;Detail
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
