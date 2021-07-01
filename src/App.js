import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useStoreDispatch from './context/hooks/useStoreDispatch';
import { HomePage, ProductPage, StorePage, CartPage } from './pages/exports';
import { Error404 } from './components/exports';

import './styles/globals.css';

function App() {
  const { dispatchAsync } = useStoreDispatch();

  useEffect(() => {
    dispatchAsync({ type: 'getAllProducts' });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/products/:productId">
          <ProductPage />
        </Route>
        <Route path="/products">
          <StorePage />
        </Route>
        <Route path="/cart">
          <CartPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
