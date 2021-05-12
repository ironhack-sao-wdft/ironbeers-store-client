import { useState } from "react";
import { useHistory } from "react-router-dom";

import api from "../../apis/index";

function ProductForm() {
  const history = useHistory();

  const [state, setState] = useState({
    name: "",
    tagline: "",
    first_brewed: "",
    description: "",
    image_url: "",
    abv: 0,
    food_pairing: [],
    contributed_by: "",
    cost: 0,
    price: 0,
    qtt_in_stock: 0,
    volume: 0,
    expire_date: "",
  });

  function handleChange(event) {
    if (event.target.files) {
      setState({ ...state, [event.target.name]: event.target.files[0] });
    } else {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  }

  async function handleFileUpload(file) {
    try {
      // FormData é uma função construtora global nativa do Javascript que cria um objeto de Formulario no formato multipart/form esperado pelo backend
      const uploadData = new FormData();

      // 'image' precisa bater com o valor de uploadCloud.single() no nosso backend
      uploadData.append("image", file);

      const response = await api.post("/image-upload", uploadData);

      return response.data.fileUrl;
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      let uploadedImageUrl = "";
      if (state.image_url) {
        uploadedImageUrl = await handleFileUpload(state.image_url);
      }

      const response = await api.post("/product", {
        ...state,
        image_url: uploadedImageUrl,
      });

      // Redireciona programaticamente para a URL '/'
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className="mb-5" onSubmit={handleSubmit}>
      <h1>New Product </h1>

      <hr />

      <div className="form-group">
        <label htmlFor="productFormName">Beer Name</label>
        <input
          type="text"
          className="form-control"
          id="productFormName"
          name="name"
          onChange={handleChange}
          value={state.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="productFormTagline">Tagline</label>
        <input
          type="text"
          className="form-control"
          id="productFormTagline"
          name="tagline"
          onChange={handleChange}
          value={state.tagline}
        />
      </div>

      <div className="form-group">
        <label htmlFor="productFormFirstBrewed">First Brewed In</label>
        <input
          type="text"
          className="form-control"
          id="productFormFirstBrewed"
          name="first_brewed"
          onChange={handleChange}
          value={state.first_brewed}
        />
      </div>

      <div className="form-group">
        <label htmlFor="productFormDescription">Description</label>
        <input
          type="text"
          className="form-control"
          id="productFormDescription"
          name="description"
          onChange={handleChange}
          value={state.description}
        />
      </div>

      <div className="form-group">
        <label htmlFor="productFormImage">Beer Picture</label>
        <input
          type="file"
          className="form-control"
          id="productFormImage"
          name="image_url"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="productFormAbv">Alcohol by volume (ABV%)</label>
        <input
          type="number"
          className="form-control"
          id="productFormAbv"
          name="abv"
          onChange={handleChange}
          value={state.abv}
        />
      </div>

      <div className="form-group">
        <label htmlFor="productFormFoodPairing">Food Pairings</label>
        <input
          type="text"
          className="form-control"
          id="productFormFoodPairing"
          name="food_pairing"
          onChange={handleChange}
          value={state.food_pairing}
        />
      </div>

      <div className="form-row">
        <div className="form-group col">
          <label htmlFor="productFormAuthor">Contributed By (Author)</label>
          <input
            type="text"
            className="form-control"
            id="productFormAuthor"
            name="contributed_by"
            onChange={handleChange}
            value={state.contributed_by}
          />
        </div>

        <div className="form-group col">
          <label htmlFor="productFormExpireDate">Expiration Date</label>
          <input
            type="date"
            className="form-control"
            id="productFormExpireDate"
            name="expire_date"
            onChange={handleChange}
            value={state.expire_date}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col">
          <label htmlFor="productFormCost">Cost</label>
          <input
            type="number"
            className="form-control"
            id="productFormCost"
            name="cost"
            onChange={handleChange}
            value={state.cost}
          />
        </div>

        <div className="form-group col">
          <label htmlFor="productFormPrice">Price</label>
          <input
            type="number"
            className="form-control"
            id="productFormPrice"
            name="price"
            onChange={handleChange}
            value={state.price}
          />
        </div>

        <div className="form-group col">
          <label htmlFor="productFormVolume">Volume (ml)</label>
          <input
            type="number"
            className="form-control"
            id="productFormVolume"
            name="volume"
            onChange={handleChange}
            value={state.volume}
          />
        </div>

        <div className="form-group col">
          <label htmlFor="productFormQttInStock">Quantity in Stock</label>
          <input
            type="number"
            className="form-control"
            id="productFormQttInStock"
            name="qtt_in_stock"
            onChange={handleChange}
            value={state.qtt_in_stock}
          />
        </div>
      </div>

      <hr />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default ProductForm;
