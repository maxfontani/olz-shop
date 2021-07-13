import { Switch, Route, useLocation } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import ProductPage from "./pages/Product/ProductPage.jsx";
import ShopPage from "./pages/Shop/ShopPage.jsx";
import CartPage from "./pages/Cart/CartPage.jsx";
import { Error404 } from "./components/index";

import "./styles/globals.css";

function App() {
  const location = useLocation();

  return (
    <Layout location={location}>
      <Switch>
        <Route path="/products/:productId" component={ProductPage} />
        <Route path="/products" component={ShopPage} />
        <Route path="/cart" component={CartPage} />
        <Route exact path="/" component={HomePage} />
        <Route path="*" component={Error404} />
      </Switch>
    </Layout>
  );
}
export default App;
