import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import ProductPage from "./pages/Product/ProductPage.jsx";
import ShopPage from "./pages/Shop/ShopPage.jsx";
import CartPage from "./pages/Cart/CartPage.jsx";
import { Error404 } from "./components/Layout/index";

import "./styles/globals.css";

const App = () => (
  <Router>
    <Switch>
      <Route path="/products/:productId" component={ProductPage} />
      <Route path="/products" component={ShopPage} />
      <Route path="/cart" component={CartPage} />
      <Route exact path="/" component={HomePage} />
      <Route path="*" component={Error404} />
    </Switch>
  </Router>
);

export default App;
