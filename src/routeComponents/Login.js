import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import api from "../apis/index";
import { AuthContext } from "../contexts/authContext";

function Login() {
  // Consumindo nosso state global do Context. Temos acesso pois Login é um componente filho do AuthContextProvider no App.js
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      const response = await api.post("/login", state);

      // Salvando os dados do usuário logado no Context (state global)
      setLoggedInUser({ ...response.data });

      // Persistir isso no localStorage pra ter essa informação mesmo que o usuário feche o navegador
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
    } catch (err) {
      console.error(err);
    }
  }

  console.log(loggedInUser);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign-In to your account</h1>
      <div className="form-group">
        <label htmlFor="loginFormEmail">Email address</label>
        <input
          type="email"
          className="form-control"
          id="loginFormEmail"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="loginFormPassword">Password</label>
        <input
          type="password"
          className="form-control"
          id="loginFormPassword"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>

      <div className="mt-4">
        <Link to="/signup">Don't have an account? Sign-up here!</Link>
      </div>
    </form>
  );
}

export default Login;
