import { useState } from "react";
import { Link } from "react-router-dom";

import api from "../../apis/index";

function Signup() {
  // O useState retorna uma array que sempre tem 2 elementos: o índice 0 sendo o seu state (que não precisa mais ser somente um objeto), e o índice 1 sendo uma função para atualizar esse state
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [address, setAddress] = useState({
    street: "",
    neighbourhood: "",
    city: "",
    postCode: "",
    stateOrProvince: "",
    country: "",
  });

  function handleStateChange(event) {
    // a função de atualização de state dos Hooks é destrutiva, ou seja, sobrescreve o state pelo que vc mandar. Para salvar o state atual antes da atualização, utilize o operador spread:
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleAddressChange(event) {
    setAddress({ ...address, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      const response = await api.post("/signup", {
        ...state,
        address: { ...address },
      });

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className="mb-5" onSubmit={handleSubmit}>
      <h1>Signup </h1>
      <h2 className="mt-3">Personal Info</h2>
      <hr />

      <div className="form-group">
        <label htmlFor="signupFormEmail">Email address</label>
        <input
          type="email"
          className="form-control"
          id="signupFormEmail"
          aria-describedby="emailHelp"
          name="email"
          onChange={handleStateChange}
          value={state.email}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="signupFormPassword">Password</label>
        <input
          type="password"
          className="form-control"
          id="signupFormPassword"
          name="password"
          onChange={handleStateChange}
          value={state.password}
        />
      </div>

      <div className="form-group">
        <label htmlFor="signupFormName">Full Name</label>
        <input
          type="text"
          className="form-control"
          id="signupFormName"
          name="name"
          onChange={handleStateChange}
          value={state.name}
        />
      </div>

      <div className="form-group">
        <label htmlFor="signupFormPhoneNumber">Phone Number</label>
        <input
          type="text"
          className="form-control"
          id="signupFormPhoneNumber"
          name="phoneNumber"
          onChange={handleStateChange}
          value={state.phoneNumber}
        />
      </div>

      <h2 className="mt-3">Address Info</h2>
      <hr />

      <div className="form-group">
        <label htmlFor="signupFormPostCode">Post Code</label>
        <input
          type="text"
          className="form-control"
          id="signupFormPostCode"
          name="postCode"
          onChange={handleAddressChange}
          value={address.postCode}
        />
      </div>

      <div className="form-group">
        <label htmlFor="signupFormStreet">Street Name</label>
        <input
          type="text"
          className="form-control"
          id="signupFormStreet"
          name="street"
          onChange={handleAddressChange}
          value={address.street}
        />
      </div>

      <div className="form-group">
        <label htmlFor="signupFormNeighbourhood">Neighbourhood</label>
        <input
          type="text"
          className="form-control"
          id="signupFormNeighbourhood"
          name="neighbourhood"
          onChange={handleAddressChange}
          value={address.neighbourhood}
        />
      </div>

      <div className="form-group">
        <label htmlFor="signupFormCity">City</label>
        <input
          type="text"
          className="form-control"
          id="signupFormCity"
          name="city"
          onChange={handleAddressChange}
          value={address.city}
        />
      </div>

      <div className="form-group">
        <label htmlFor="signupFormState">State or Province</label>
        <input
          type="text"
          className="form-control"
          id="signupFormState"
          name="stateOrProvince"
          onChange={handleAddressChange}
          value={address.stateOrProvince}
        />
      </div>

      <div className="form-group">
        <label htmlFor="signupFormCountry">Country</label>
        <input
          type="text"
          className="form-control"
          id="signupFormCountry"
          name="country"
          onChange={handleAddressChange}
          value={address.country}
        />
      </div>

      <hr />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>

      <div className="mt-4">
        <Link to="/login">Already have an account? Sign-in here!</Link>
      </div>
    </form>
  );
}

export default Signup;
