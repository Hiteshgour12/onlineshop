/* REACT BOOTSTRAP */
import { Container } from "react-bootstrap";

/* COMPONENTS */
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
// import ProductScreen from "./screens/ProductScreen";
// import CartScreen from "./screens/CartScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
// import ProfileScreen from "./screens/ProfileScreen";
// import ShippingScreen from "./screens/ShippingScreen";
// import PaymentScreen from "./screens/PaymentScreen";
// import PlaceOrderScreen from "./screens/PlaceOrderScreen";
// import OrderScreen from "./screens/OrderScreen";
// import UserListScreen from "./screens/UserListScreen";
// import UserEditScreen from "./screens/UserEditScreen";
// import ProductListScreen from "./screens/ProductListScreen";
// import ProductEditScreen from "./screens/ProductEditScreen";
// import OrderListScreen from "./screens/OrderListScreen";
import Add_product from "./screens/Add_product";
import Add_category from "./screens/Category";
import Add_brand from "./screens/Brand";
// import Add_subcategoryScreen from "./screens/Add_subcategoryScreen";
import CustomerList from "./screens/CustomerScreen";
import EditItem from "./screens/Edititem";
import Dashboard from "./screens/DashboardScreen";
import Subcategory from "./screens/Sub_Category";
import Itemlist from "./screens/Items_list";
import UserProfile from "./screens/UserProfile";
import Orders from "./screens/orders";
import OrderDetails from "./screens/OrderDetail";
import CategoryProduct from "./screens/CatProduct";

/* REACT ROUTER */
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main className="py-3">
          <Route exact path="/" component={Home} />

          <Route path="/login" component={Login} />

          <Route path="/register" component={Register} />

          {/* <Route path="/profile" component={ProfileScreen} />

          <Route path="/shipping" component={ShippingScreen} />

          <Route path="/payment" component={PaymentScreen} />

          <Route path="/placeorder" component={PlaceOrderScreen} />

          <Route path="/order/:id" component={OrderScreen} />

          <Route path="/product/:id" component={ProductScreen} />

          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/admin/userlist" component={UserListScreen} />

          <Route path="/admin/user/:id/edit" component={UserEditScreen} />

          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />

          <Route path="/admin/productlist" component={ProductListScreen} />

          <Route path="/admin/orderlist" component={OrderListScreen} /> */}



          {/* custome page */}
          {/* <Route component={EnsureLoggedInContainer}> */}

            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/add_product" component={Add_product} />
            <Route path="/add_category" component={Add_category} />
            <Route path="/add_brand" component={Add_brand} />
            <Route path ="/customerslist" component={CustomerList}/>
            <Route path="/itemlist" component={Itemlist}/>
            <Route path="/edititemlist/:id" component={EditItem}/>
            <Route path="/subcategory" component={Subcategory}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/detail/:id" component={OrderDetails}/>
            <Route path="/catproduct/:id" component={CategoryProduct}/>

          {/* </Route> */}




        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
