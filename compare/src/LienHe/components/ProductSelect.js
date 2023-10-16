import React from 'react';

const ProductSelect = ({ products, onChange, value }) => (
  <select className="select-btn-compare" value={value} onChange={e => onChange(e.target.value)}>
    {products.map((product, index) => (
      <option key={index} value={index}>{product.title}</option>
    ))}
  </select>
);

export default ProductSelect;
