import React, { useState, useEffect } from "react";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import _ from 'lodash';

/* REACT ROUTER */
import {Button, Col, Form, Row,Table } from "react-bootstrap";



export default function Subcategory() {
  // /* STATE */
const [name, setName] = useState('');
const [category_id, setCategory_id] = useState('');


const [subcategory, setSubcategory] = useState();
var data = '';
  useEffect(()=>{
    get();
  },[])

  const get =()=>{
    var config = {
      method: 'get',
      url: 'http://127.0.0.1:8000/product/subcategorys/',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMjAyMzI3LCJpYXQiOjE2NzIxMTU5MjcsImp0aSI6IjdmM2I2ZDM1YmI1NTQ0OTY4MjAyYTM1NDA4YmJjYzc0IiwidXNlcl9pZCI6MX0.ukY6AFzZidczMJEk1HGXdTFNM_du-yOa_qWqfsylKEc',
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      const orderby = _.orderBy(response.data.subcategory,'id','desc');

      setSubcategory(orderby)
      console.log(JSON.stringify(response.data.subcategory));
    })
    .catch(function (error) {
      console.log(error);
    });
  }




  // /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    var data = JSON.stringify({
      "name": name,
      "category_id": category_id

    });
    
    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8080/product/subcategory/',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMjAyMzI3LCJpYXQiOjE2NzIxMTU5MjcsImp0aSI6IjdmM2I2ZDM1YmI1NTQ0OTY4MjAyYTM1NDA4YmJjYzc0IiwidXNlcl9pZCI6MX0.ukY6AFzZidczMJEk1HGXdTFNM_du-yOa_qWqfsylKEc',
        'Content-Type': 'application/json'
        },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      get();
      console.log(JSON.stringify(response.data));
      setName("")
      setCategory_id("")
    })
    .catch(function (error) {
      console.log(error);
    });
 
  };

  return (
    <Row style={{marginLeft:'-10vh'}}>
     
      <Col md={3}>
        <h2>Add SubCategory</h2>

    
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

          <Form.Group controlId="category_id">
          <Form.Label>Category_id</Form.Label>
          <Form.Control
            required
            type="category_id"
            placeholder="Enter category_id"
            value={category_id}
            onChange={(e) => setCategory_id(e.target.value)}
          />
        </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
          Add Sub-Category
          </Button>
        </Form>
      </Col >

      
      <Col md={9}>
      <h2>Sub Category</h2>
      <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {subcategory&&subcategory.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.category_id}</td>

                  {/* <td>
                    {item.createdAt ? item.createdAt.substring(0, 10) : null}
                  </td>
                  <td>${item.totalPrice}</td> */}
                  <td>    
                    <LinkContainer to={`editcustomerlist/${subcategory.id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
            </td>
            <td>
                    <LinkContainer to={`editcustomerlist/${subcategory.id}`}>
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
