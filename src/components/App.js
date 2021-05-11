import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Signup from "../routeComponents/auth/Signup";
import Login from "../routeComponents/auth/Login";
import Profile from "../routeComponents/auth/Profile";
import ProtectedRoute from "../routeComponents/auth/ProtectedRoute";
import Navbar from "./Navbar";

import ProductFeed from "../routeComponents/product/ProductFeed";

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <Navbar />
        <div className="container mt-5">
          <Switch>
            <Route exact path="/" component={ProductFeed} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
