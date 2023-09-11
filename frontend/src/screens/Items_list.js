import React,{useEffect, useState} from "react";
import axios from "axios";
import { Row, Col,Button,Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import _ from 'lodash';

// import { listProducts } from "../actions/productActions";

export default function EditItem(){
  // const id = match.params.id;

  const deleteHandler= (id) =>{
    if (window.confirm("Are you sure you want to delete this product ?")){
  var config = {
    method: 'delete',
    url: `http://127.0.0.1:8000/product/item/${id}`,
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





  // GET PRODUCT LIST
const [product, setProduct] = useState();
 
useEffect(()=>{
  get();
},[])
    

const get =()=>{
  // debugger;
  var config = {
    method: 'get',
    url: 'http://127.0.0.1:8000/product/items/',
    headers: { 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMzgwMTY1LCJpYXQiOjE2NzIyOTM3NjUsImp0aSI6ImU0MzEwNDUyM2Q3MTRlNWI5MjEyM2M0OTRhMDQyYWYzIiwidXNlcl9pZCI6MX0.aHFkztX_N7qYp8I2OqBiihnRwO0WQ483JBAZgDa0Fmw',
      'Content-Type': 'application/json'
      }
  };
  
  axios(config)
  .then(function (response) {
    
    
    const orderby = _.orderBy(response.data.Product,'id','desc');
    setProduct(orderby);
    console.log(JSON.stringify(response.data.Product));
  })
  .catch(function (error) {
    console.log(error);
  });

}


  return(
    <div>
         <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end" md="2">
        <LinkContainer to={"/add_product"}>
            <Button className="my-1" >
                <i className="fas fa-plus"></i>Add Product
            </Button>
        </LinkContainer>
          
        </Col>
      </Row>
      <Table striped bordered hover responsive className="table-sm">
      <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>brand</th>
                <th>subcategory_id</th>
                <th>detail</th>
                <th>price</th>
                <th>categories_id</th>
                <th>Stock</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
        </thead>
        <tbody> 
        
        {
            product&&product.map((item)=>{
                
           return <>
            <tr>
            <td>{item.id}</td>
            <td>{ item.name   }</td>
            <td>{  item.product_brand_id   }</td>
            <td>{  item.subcategory_id   }</td>
            <td>{  item.product_detail   }</td>
            <td>{  item.product_price    }</td>
            {/* <td>image: {  item.product_image   }</td> */}
            <td>{  item.categories_id   }</td> 
            <td>{  item.countInStock   }</td> 
            <td>    
                    <LinkContainer to={`edititemlist/${item.id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
            </td>
            <td>
                    {/* <LinkContainer to={`item/${item.id}`}> */}
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                    {/* </LinkContainer> */}

            </td>
           </tr>
            </>
            })
    }       
        </tbody>  
      </Table>
      </div>
  )

       
}

// export default HomeScreen;



// how to implement pagination in reactjs?
// class TodoApp extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       todos: ['a','b','c','d','e','f','g','h','i','j','k'],
//       currentPage: 1,
//       todosPerPage: 3
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick(event) {
//     this.setState({
//       currentPage: Number(event.target.id)
//     });
//   }

//   render() {
//     const { todos, currentPage, todosPerPage } = this.state;

//     // Logic for displaying todos
//     const indexOfLastTodo = currentPage * todosPerPage;
//     const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
//     const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

//     const renderTodos = currentTodos.map((todo, index) => {
//       return <li key={index}>{todo}</li>;
//     });

//     // Logic for displaying page numbers
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
//       pageNumbers.push(i);
//     }

//     const renderPageNumbers = pageNumbers.map(number => {
//       return (
//         <li
//           key={number}
//           id={number}
//           onClick={this.handleClick}
//         >
//           {number}
//         </li>
//       );
//     });

//     return (
//       <div>
//         <ul>
//           {renderTodos}
//         </ul>
//         <ul id="page-numbers">
//           {renderPageNumbers}
//         </ul>
//       </div>
//     );
//   }
// }


// ReactDOM.render(
//   <TodoApp />,
//   document.getElementById('app')
// );





