import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SignUpForm from './pages/SignUpForm';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route path="/shop/:gender/:category/:categoryId" component={ShopPage} />
        <Route path="/shop/:gender/:category/:categoryId/:productSlug/:productId" component={ProductDetailPage} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/login" component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;