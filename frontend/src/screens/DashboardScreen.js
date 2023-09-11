import React, { useState, useEffect } from "react";
import { Row, Col, Button,Table} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import _ from 'lodash';




export default function Dashboard(){

    const [user, setUser] = useState();

    useEffect(()=>{
        get();
      },[])

      const get =()=>{
    var config = {
        method: 'get',
        url: 'http://127.0.0.1:8000/userlist/',
        headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMzgwMTY1LCJpYXQiOjE2NzIyOTM3NjUsImp0aSI6ImU0MzEwNDUyM2Q3MTRlNWI5MjEyM2M0OTRhMDQyYWYzIiwidXNlcl9pZCI6MX0.aHFkztX_N7qYp8I2OqBiihnRwO0WQ483JBAZgDa0Fmw',
        }
      };
      
      axios(config)
      .then(function (response) {
        const orderby = _.orderBy(response.data.users,'id','desc');

        setUser(orderby)
        console.log(JSON.stringify(response.data.users));
      })
      .catch(function (error) {
        console.log(error);
      });
    }

return (
  <Row >
    <Col md={2}>
      <h2>Dashboard</h2>
        <LinkContainer to={"/itemlist"}>
            <Button  variant="primary" className="mt-3">
                 Products
            </Button>
        </LinkContainer>
        <LinkContainer to={"/add_brand"}>
            <Button  variant="primary" className="mt-3">
                 Brands
            </Button>
        </LinkContainer>
        <LinkContainer to={"/add_category"}>
            <Button type="submit" variant="primary" className="mt-3">
                 Category
            </Button>
        </LinkContainer>
        <LinkContainer to={"/subcategory"}>
            <Button type="submit" variant="primary" className="mt-3">
                 Sub-Category
            </Button>
        </LinkContainer>
        <LinkContainer to={"/orders"}>
            <Button type="submit" variant="primary" className="mt-3">
                 Orders
            </Button>
        </LinkContainer>
    </Col>

    <Col md={10} >
    <h2>Customers</h2>      
            <Table striped bordered hover responsive className="table-sm">
           <thead>
              <tr>
                <th>NAME</th>
                <th>Email</th>
                <th>Contact</th>
                {/* <th>City</th>
                <th>Gender</th> */}
                <th>Address</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>    
                {
                    user&&user.map((item)=>{
                
           return <>
           
           
            
            <tr>
            <td>{  item.full_name   }</td>
            <td>{  item.email   }</td>
            <td>{  item.contact   }</td>
            {/* <td>{  item.city   }</td>
            <td>{  item.gender    }</td> */}
            <td>{  item.address   }</td>
            <td>    
                    <LinkContainer to={`editcustomerlist/${user.id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
            </td>
            <td>
                    <LinkContainer to={`editcustomerlist/${user.id}`}>
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
            </>
            })
    }
        </tbody>
    </Table>
     
    </Col>
  </Row>
);



    

}