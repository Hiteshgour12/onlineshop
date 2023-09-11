import React, { useState, useEffect } from "react";
import axios from "axios";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import {Button, Form } from "react-bootstrap";

/* COMPONENTS */
// import Message from "../components/Message";
// import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

/* REACT - REDUX */
// import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
// import { register } from "../actions/userActions";

export default function EditItem({match}) {

const id = match.params.id;

// get item by id
// const [item, setItem] = useState('');

var data = '';
useEffect(()=>{
    get();
  },[])

  const get =()=>{
var config = {
  method: 'get',
  url: `http://127.0.0.1:8000/product/item/${id}`,
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMzgwMTY1LCJpYXQiOjE2NzIyOTM3NjUsImp0aSI6ImU0MzEwNDUyM2Q3MTRlNWI5MjEyM2M0OTRhMDQyYWYzIiwidXNlcl9pZCI6MX0.aHFkztX_N7qYp8I2OqBiihnRwO0WQ483JBAZgDa0Fmw',
  },
  data : data
};

axios(config)
.then(function (response) {
  setName(response.data.Product[0].name);
  setBrand(response.data.Product[0].product_brand_id);
  setSubcategory_id(response.data.Product[0].subcategory_id);
  setProduct_detail(response.data.Product[0].product_detail);
  setProduct_price(response.data.Product[0].product_price);
  setProduct_image(response.data.Product[0].product_image[0]);
  setCategories_id(response.data.Product[0].categories_id);
  console.log(JSON.stringify(response.data.Product));
})
.catch(function (error) {
  console.log(error);
});
}

    
  // /* STATE */
  
  
const [name, setName] = useState('');
const [product_brand_id, setBrand] = useState('');
const [subcategory_id, setSubcategory_id] = useState('');
const [product_detail, setProduct_detail] = useState('');
const [product_price, setProduct_price] = useState('');
const [product_image, setProduct_image] = useState();
const [categories_id, setCategories_id] = useState('');




  // /* HANDLERS */

  const submitHandler = (e) => {
    e.preventDefault();

    var formdata = new FormData();
    formdata.append("name", name)
    formdata.append("product_brand_id", product_brand_id)
    formdata.append("subcategory_id", subcategory_id)
    formdata.append( "product_detail", product_detail)
    formdata.append("product_price", product_price)
    formdata.append("product_image", product_image)
    formdata.append("categories_id", categories_id)
   
    
    var config = {
      method: 'put',
      url: `http://127.0.0.1:8000/product/item/${id}`,
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMzgwMTY1LCJpYXQiOjE2NzIyOTM3NjUsImp0aSI6ImU0MzEwNDUyM2Q3MTRlNWI5MjEyM2M0OTRhMDQyYWYzIiwidXNlcl9pZCI6MX0.aHFkztX_N7qYp8I2OqBiihnRwO0WQ483JBAZgDa0Fmw',
        'Content-Type': 'multipart/form-data'
      },
      data : formdata
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
 
  };
  const handelImage =(e)=>{
    setProduct_image(e.target.files[0])
    
  }
  

  return (
<>
<Link to="/itemlist">Go Back</Link>
    <FormContainer>
      {/* {console.log(item)} */}
      <h1>Edit Product</h1>
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

        <Form.Group controlId="email">
          <Form.Label>Brand Name</Form.Label>
          <Form.Control
            required
            type="brand"
            placeholder="Enter Brand Name"
            value={product_brand_id}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="subcategory_id">
          <Form.Label>Subcategory_id</Form.Label>
          <Form.Control
            required
            type="subcategory_id"
            placeholder="Enter subcategory_id"
            value={subcategory_id}
            onChange={(e) => setSubcategory_id(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="product_detail">
          <Form.Label>Discription</Form.Label>
          <Form.Control
            required
            type="product_detail"
            placeholder="Discribe your product"
            value={product_detail}
            onChange={(e) => setProduct_detail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="product_price">
          <Form.Label>Price &nbsp;₹</Form.Label>
          <Form.Control
            required
            type="product_price"
            placeholder="₹"
            value={product_price}
            onChange={(e) => setProduct_price(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="product_image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            required
            type="file"
            placeholder="Image"
            
            onChange={handelImage}
          />
        </Form.Group>

        <Form.Group controlId="categories_id">
          <Form.Label>Categories_id</Form.Label>
          <Form.Control
            required
            type="categories_id"
            placeholder="Enter categories_id"
            value={categories_id}
            onChange={(e) => setCategories_id(e.target.value)}
          />
        </Form.Group>

        {/* <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group> */}

        
        
        <Button type="submit" variant="primary" className="mt-3">
          Update Product
        </Button>
      </Form>

      {/* <Row className="py-3">
        <Col>
          Have an Account ?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row> */}
    </FormContainer>
    </>
  );
}

// export default RegisterScreen;
