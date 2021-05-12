import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import api from "../../apis/index";

function ProductDetails() {
  const [state, setState] = useState({
    image_url: "",
    food_pairing: [],
    _id: "",
    name: "",
    tagline: "",
    first_brewed: "",
    description: "",
    abv: 0,
    contributed_by: "",
    cost: 0,
    price: 0,
    qtt_in_stock: 0,
    volume: 0,
    expire_date: "",
  });

  // Equivalente a usar o props.match.params.id
  const { id } = useParams();

  useEffect(() => {
    async function fetchBeer() {
      try {
        const response = await api.get(`/product/${id}`);

        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchBeer();
  }, [id]);

  return (
    <div>
      <img
        className="card-img product-img mx-auto mt-2"
        src={state.image_url}
        alt="beer"
      />
      <div className="card-body">
        <h4 className="card-title">
          <small>{state.name}</small>
        </h4>

        <h3 className="card-text">
          {Number(state.price).toLocaleString(window.navigator.languages[0], {
            style: "currency",
            currency: "USD",
          })}
        </h3>

        <p>
          <small>In stock: {state.qtt_in_stock} units</small>
        </p>

        <p className="mb-0">
          <small className="card-text">{state.volume}ml</small>
        </p>

        <p>
          <small>Alcohol by volume: {state.abv}%</small>
        </p>

        <p>
          <small>
            Expire Date: {new Date(state.expire_date).toLocaleString()}
          </small>
        </p>

        <p className="card-text mb-0">
          <small>{state.tagline}</small>
        </p>

        <p className="card-text mb-0">
          <small>{state.description}</small>
        </p>

        <p>
          <strong>Food Pairings</strong>
        </p>
        <ul>
          {state.food_pairing.map((food) => (
            <li key={food}>
              <small>{food}</small>
            </li>
          ))}
        </ul>

        <p className="card-text mb-0">
          <small>
            <strong>Created by:</strong>{" "}
            {state.contributed_by ? state.contributed_by.split("<")[0] : ""}
          </small>
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
