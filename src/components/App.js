import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Signup from "../routeComponents/Signup";

function App() {
  return (
    <div className="container mt-5">
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
