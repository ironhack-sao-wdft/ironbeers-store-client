import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard(props) {
  return (
    <Link
      className="text-decoration-none "
      key={props.beer._id}
      to={`/product/${props.beer._id}`}
    >
      <div
        className="card card-fixed-height text-dark shadow rounded border-0 m-2"
        style={{ width: "100%" }}
      >
        <img
          className="card-img product-img mx-auto mt-2"
          src={props.beer.image_url}
          alt="beer"
        />
        <div className="card-body">
          <h4 className="card-title">
            <small>{props.beer.name}</small>
          </h4>

          <h3 className="card-text">
            {Number(props.beer.price).toLocaleString(
              window.navigator.languages[0],
              { style: "currency", currency: "USD" }
            )}
          </h3>
          <p className="mb-0">
            <small className="card-text">{props.beer.volume}ml</small>
          </p>

          <p className="card-text mb-0">
            <small>{props.beer.tagline}</small>
          </p>
          <p className="card-text mb-0">
            <small>
              <strong>Created by:</strong>{" "}
              {props.beer.contributed_by
                ? props.beer.contributed_by.split("<")[0]
                : ""}
            </small>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
