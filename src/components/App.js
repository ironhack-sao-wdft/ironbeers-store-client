import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Signup from "../routeComponents/Signup";
import Login from "../routeComponents/Login";
import Profile from "../routeComponents/Profile";
import Navbar from "./Navbar";

import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <Navbar />
        <div className="container mt-5">
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
