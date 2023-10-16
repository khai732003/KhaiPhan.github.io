import React from 'react';

const Product = ({ product }) => (
  <div className="col-md-4">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>{product.price}</p>
    <button>Thêm vào giỏ</button>
  </div>
);

export default Product;
