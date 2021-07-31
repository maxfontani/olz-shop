import { Switch, Route, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/Home/HomePage";
import ProductPage from "./pages/Product/ProductPage";
import ShopPage from "./pages/Shop/ShopPage";
import CartPage from "./pages/Cart/CartPage";
import OrdersPage from "./pages/Orders/OrdersPage";
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
        <Route path="/orders" component={OrdersPage} />
        <Route exact path="/" component={HomePage} />
        <Route path="*" component={Error404} />
      </Switch>
    </Layout>
  );
}
export default App;
