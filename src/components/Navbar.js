import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { useContext } from "react";

import { AuthContext } from "../contexts/authContext";

function Navbar() {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="ml-3">
        <NavLink className="navbar-brand" to="/">
          Ironbeers Store
        </NavLink>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse d-flex justify-content-between"
        id="navbarText"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/new-beer"
            >
              New Beer
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/all">
              All Beers
            </NavLink>
          </li>
        </ul>
        <div className="mr-3">
          {loggedInUser.user.name ? (
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                <img
                  src={`https://ui-avatars.com/api/?name=${loggedInUser.user.name}&size=32`}
                  className="rounded-circle"
                  alt="Profile"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <NavLink to="/profile" component={Dropdown.Item}>
                  Profile
                </NavLink>
                <NavLink to="/logout" component={Dropdown.Item}>
                  Logout
                </NavLink>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <NavLink
              className="nav-link text-white"
              activeClassName="active"
              to="/login"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
