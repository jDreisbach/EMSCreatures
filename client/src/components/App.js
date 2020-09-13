import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import LoginForm from './login/Login';
import Registration from './registration/registration';
import About from './About';
import Contact from './Contact';
import Products from './products/Products';
import Cart from './cart/Cart';
//import Featured from './products/featured/Featured';
import Admin from "./admin/Admin";
import Users from "./admin/users/Users";
import AdminProducts from "./admin/products/Products";
import CreateProduct from './admin/products/CreateProduct';
import ProductsManager from './admin/products/ManageProducts';
import Checkout from "./checkout/Checkout";
import CheckoutSuccess from "./checkout/CheckoutSuccess";
import CheckoutFailure from "./checkout/CheckoutFailure";
//import CheckoutForm from "./checkout/CheckoutForm";
import Dash from './Dash';
import OrderList from './admin/orders/Orders';

 class App extends Component{
    componentDidMount(){
        this.props.fetchUser();
    }

     render(){
    return (
        <div>
            <BrowserRouter>
                   <div>
                       <Header />
                       <Route exact={true} path='/' component={Landing} />
                       <Route exact={true} path='/main/dash' component={Dash} />
                       <Route exact={true} path ='/login' component = {LoginForm} />
                       <Route exact={true} path='/register' component={Registration} />
                       <Route exact={true} path='/about' component={About} />
                       <Route exact={true} path='/contact' component={Contact} />
                       <Route exact={true} path='/cart' component={Cart} />
                       <Route exact={true} path='/main/products' component={Products} />
                       <Route path="/admin" component={Admin}/>
                       {/*<Route path='/main' component={Featured} /> */}
                       <Route exact={true} path="/admin/users" component={Users} />
                       <Route exact={true} path='/admin/products' component={AdminProducts} />
                       <Route exact={true} path="/admin/products/createproduct" component={CreateProduct} />
                       <Route exact={true} path="/admin/products/productmanager" component={ProductsManager} />
                       <Route exact={true} path="/main/checkout" component={Checkout} />
                       {/*<Route exact={true} path="/main/checkoutform" component={CheckoutForm} />*/}
                       <Route exact={true} path="/main/paymentsuccess" component={CheckoutSuccess} />
                       <Route exact={true} path="/main/paymentfailure" component={CheckoutFailure} />
                       <Route exact={true} path="/admin/orders" component={OrderList} />
                       
                   </div>
            </BrowserRouter>
        </div>
    );
  }
};

export default connect(null, actions)(App);