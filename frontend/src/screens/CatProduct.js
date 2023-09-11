import React,{useEffect, useState} from "react";
import axios from "axios";
import { Card,Button, ListGroup,Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
// const BASE_URL = 'http://localhost:8000';

/* REACT-BOOTSTRAP */
// import { Row, Col } from "react-bootstrap";

/* COMPONENTS */
// import Product from "../components/Product";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import Paginate from "../components/Paginate";
// import ProductCarousel from "../components/ProductCarousel";

/* REACT - REDUX */
// import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
// import { listProducts } from "../actions/productActions";

export default function CategoryProduct({match}){
    const id = match.params.id;
  // const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  // const productList = useSelector((state) => state.productList);
  // const { products, page, pages, loading, error } = productList;

  /* FIRING OFF THE ACTION CREATORS USING DISPATCH */

  // let keyword =
  //   history.location
  //     .search; /* IF USER SEARCHES FOR ANYTHING THEN THIS KEYWORD CHANGES AND USE EFFECT GETS TRIGGERED */

  // useEffect(() => {
  //   dispatch(listProducts(keyword));
  // }, [dispatch, keyword]);

  const [product, setProduct] = useState();
  const [cat, setCat] = useState();
  const [brand, setBrand] = useState();
    

useEffect(()=>{
//   get();
  get1();
  get2();
},[])

const get1=()=>{
  var config = {
    method: 'get',
    url: 'http://127.0.0.1:8000/product/brandlist/',
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data.Brands));
    setBrand(response.data.Brands);
  })
  .catch(function (error) {
    console.log(error);
  });
}


const get2=()=>{
  var config = {
    method: 'get',
    url: 'http://127.0.0.1:8000/product/categorylist/',
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data.category));
    setCat(response.data.category);
  })
  .catch(function (error) {
    console.log(error);
  });
}
    

const catfilterHandler= (id) =>{

  var config = {
    method: 'get',
    url: `http://127.0.0.1:8000/product/catproduct/${id}`,
    headers: { 
        'Content-Type': 'application/json'
      }
  };
  
  axios(config)
  .then(function (response) {
    
    setProduct(response.data.catProduct);
    console.log(JSON.stringify(response.data.catProduct));
  })
  .catch(function (error) {
    console.log(error);
  });

}


  return(

    
    <div style={{marginLeft:'-10vh'}}>
      <div style={{ height:'50vh',width:'30vh',float:'left' }}>
      <Table>
      <thead>
       <tr><td><h4>Categories</h4></td></tr>
       </thead>
       <tbody>
        {cat&&cat.map((p)=>(
          <tr>
            
            <Link className="nav-link"  onClick={() => catfilterHandler(p.id)} > {p.name} </Link>
          
          </tr>
        ))}
        
       </tbody>
       </Table>

      <Table>
      <thead>
       <tr><td><h4>Brands</h4></td></tr>
       </thead>
       <tbody>
        {brand&&brand.map((b)=>(
          <tr>
            <Link className="nav-link" to="/"> {b.name} </Link>
          </tr>
        ))}
        
       </tbody>
       </Table>
      </div>
      <div>
       <Row>
       
        { product&&product.map((item)=>{
                
           return <>
            <Col md={4} className="mt=4">
              <Card style={{ width: '20rem' }}>
                <Card.Img variant="top" src= {  item.product_image   } />
                  <Card.Body>
                    <Card.Title><h4>{  item.name   }</h4></Card.Title>
                    <Card.Text>{  item.product_detail   }</Card.Text>
                  </Card.Body>

                <ListGroup className="list-group-flush">
                  <ListGroup.Item>{  item.product_brand   }</ListGroup.Item>
                  <ListGroup.Item>{  item.product_price    }</ListGroup.Item>
                  {/* <ListGroup.Item>{  item.categories_id   }&nbsp;{  item.subcategory_id   }</ListGroup.Item> */}
                </ListGroup>
                <Card.Body>
                  <Button variant="success">
                    <Card.Link href="#">Add To Cart</Card.Link>
                  </Button>
                  &nbsp; &nbsp;
                  &nbsp; &nbsp;

                  <Button variant="danger">
                  <Card.Link href="#">Detail</Card.Link>
                  </Button>
                </Card.Body>
              </Card>

            </Col>
            </>
            })
    }
        
        </Row>
        </div>
    </div>
    )
}

// export default HomeScreen;


