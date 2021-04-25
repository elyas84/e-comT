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
import CategoryPage from "./components/pages/CategoryPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import ShopingCartPage from "./components/pages/ShopingCartPage";
import Checkout1Page from "./components/pages/Checkout1Page";
import CustomerOrdersPage from "./components/pages/CustomerOrdersPage";
import CustomerAccountPage from "./components/pages/CustomerAccountPage";
import CustomerOrderPage from "./components/pages/CustomerOrderPage";
import Checkout2Page from "./components/pages/Checkout2Page";
import Checkout3Page from "./components/pages/Checkout3Page";
import AboutPage from "./components/pages/AboutPage";

export default function App() {
  return (
    <Router>
      <Header />

      <main>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/about" component={AboutPage}></Route>
          <Route exact path="/register" component={RegisterPage}></Route>
          <Route exact path="/cart" component={ShopingCartPage}></Route>
          <Route exact path="/checkout-1" component={Checkout1Page}></Route>
          <Route exact path="/checkout-2" component={Checkout2Page}></Route>
          <Route exact path="/checkout-3" component={Checkout3Page}></Route>
          <Route exact path="/contact" component={ContactPage}></Route>
          <Route exact path="/mobile" component={MobilePage}></Route>
          <Route exact path="/computer" component={ComputerPage}></Route>
          <Route exact path="/category" component={CategoryPage}></Route>
          <Route exact path="/detail" component={ProductDetailPage}></Route>
          <Route
            exact
            path="/customer-orders"
            component={CustomerOrdersPage}
          ></Route>
          <Route
            exact
            path="/customer-account"
            component={CustomerAccountPage}
          ></Route>
          <Route
            exact
            path="/customer-order"
            component={CustomerOrderPage}
          ></Route>
        </Switch>
      </main>

      <Footer />
    </Router>
  );
}
