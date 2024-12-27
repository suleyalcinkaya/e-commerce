import HomePage from "./pages/HomePage";
import SignUpForm from "./pages/SignUpForm";
import Login from "./pages/Login";
import './index.css';
import { Route, Switch } from 'react-router-dom';
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";


function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/signup" component={SignUpForm} />
      <Route path="/login" component={Login} />   
      <Route path="/shop/:gender/:category/:categoryId" component={ShopPage} />
      <Route path="" component={ProductDetailPage}/>
    </Switch>
  );
}

export default App;