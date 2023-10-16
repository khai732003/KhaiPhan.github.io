// Product.js
import React from "react";
import "./Product.css"; // Import CSS file
import { Link } from "react-router-dom";

const Product = ({ id, name, productImage, price, code, detail, onAddToCart }) => (
  <div className="col-md-12">
    <div className="product-card card mb-4">
      <img src={productImage} alt={name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">ID: {id}</p>
        <p className="card-text">Price: ${price}</p>
        <p className="card-text">productImage: {productImage}</p>
        <p className="card-text">Code: {code}</p>
        <p>
          <button className="column-button">Detail </button>
        </p>
        <button onClick={onAddToCart}>Add to Cart</button>
      </div>
    </div>
  </div>
);

export default Product;
