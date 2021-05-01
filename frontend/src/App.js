import React from "react";
import "./bootstrap.min.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import RegisterPage from "./components/pages/RegisterPage";
import ContactPage from "./components/pages/ContactPage";
import MobilePage from "./components/pages/MobilePage";
import ComputerPage from "./components/pages/ComputerPage";
import AllProductPage from "./components/pages/AllProductPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import ShopingCartPage from "./components/pages/ShopingCartPage";
import Checkout1Page from "./components/pages/Checkout1Page";
import ProfilePage from "./components/pages/ProfilePage";
import CustomerAccountPage from "./components/pages/CustomerAccountPage";
import CustomerOrderPage from "./components/pages/CustomerOrderPage";
import CustomerListPage from "./components/pages/CustomerListPage";
import Checkout2Page from "./components/pages/Checkout2Page";
import Checkout3Page from "./components/pages/Checkout3Page";
import AboutPage from "./components/pages/AboutPage";
import ErrorPage from "./components/pages/ErrorPage";
import LoginPage from "./components/pages/LoginPage";
import ProductListPage from "./components/pages/ProductListPage";
import AddProductPage from "./components/pages/AddProductPage";
import EditProductPage from "./components/pages/EditProductPage";
import CustomerOrderDetailsPage from "./components/pages/CustomerOrderDetailsPage";
import CustomersOrderListPage from "./components/pages/CustomersOrderListPage";
import AdminAccountPage from "./components/pages/AdminAccountPage";
import ScrollSolution from './components/layout/ScrollSolution'
import SearchPage from "./components/pages/SearchPage";
import CartPage from "./components/pages/CartPage";

import OrderPage from "./components/pages/OrderPage";
export default function App() {
  return (
    <Router>
      <ScrollSolution>
        <Header />

        <main>
          <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/cart/:id?" component={CartPage}></Route>
            <Route exact path="/about" component={AboutPage}></Route>
            <Route exact path="/register" component={RegisterPage}></Route>
            <Route exact path="/login" component={LoginPage}></Route>
            {/* <Route exact path="/cart/:id?" component={ShopingCartPage}></Route> */}
            <Route exact path="/checkout-1" component={Checkout1Page}></Route>
            <Route exact path="/checkout-2" component={Checkout2Page}></Route>
            <Route exact path="/checkout-3" component={Checkout3Page}></Route>
            <Route exact path="/contact" component={ContactPage}></Route>
            <Route exact path="/mobile" component={MobilePage}></Route>
            <Route exact path="/computer" component={ComputerPage}></Route>
            <Route exact path="/products" component={AllProductPage}></Route>
            <Route exact path="/order/:id" component={OrderPage}></Route>
            <Route
              exact
              path="/detail/:id"
              component={ProductDetailPage}
            ></Route>
            <Route
              exact
              path="/order-details"
              component={CustomerOrderDetailsPage}
            ></Route>
            <Route
              exact
              path="/admin/new-product"
              component={AddProductPage}
            ></Route>
            <Route
              exact
              path="/admin/account"
              component={AdminAccountPage}
            ></Route>
            <Route
              exact
              path="/admin/:id/edit-product"
              component={EditProductPage}
            ></Route>
            <Route
              exact
              path="/admin/products-list"
              component={ProductListPage}
            ></Route>
            <Route
              exact
              path="/admin/customers-list"
              component={CustomerListPage}
            ></Route>
            <Route exact path="/profile" component={ProfilePage}></Route>
            <Route
              exact
              path="/customer-account"
              component={CustomerAccountPage}
            ></Route>
            <Route
              exact
              path="/admin/orderlist"
              component={CustomersOrderListPage}
            ></Route>
            <Route
              exact
              path="/customer-orders"
              component={CustomerOrderPage}
            ></Route>
            <Route path="/search/:keyword" component={SearchPage}></Route>
            <Route component={ErrorPage}></Route>
          </Switch>
        </main>

        <Footer />
      </ScrollSolution>
    </Router>
  );
}
