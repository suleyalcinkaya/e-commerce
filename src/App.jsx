import HomePage from "./pages/HomePage";
import SignUpForm from "./pages/SignUpForm";
import Login from "./pages/Login";
import './index.css';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/signup" component={SignUpForm} />
      <Route path="/login" component={Login} />
    </Switch>
  );
}

export default App;