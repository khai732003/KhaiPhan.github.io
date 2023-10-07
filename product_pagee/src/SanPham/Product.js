// Product.js
import React from "react";
import "./Product.css"; // Import CSS file

const Product = ({ id, name, price, image }) => (
  <div className="col-md-12">
    <div className="product-card card mb-4">
      <img src={image} alt={name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">ID: {id}</p>
        <p className="card-text">Price: ${price}</p>
      </div>
    </div>
  </div>
);

export default Product;
