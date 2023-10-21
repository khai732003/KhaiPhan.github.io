// src/components/Main.js
import React, { useState } from 'react';
import Product from './Product';
import Filter from './Filter';
import { products, colors } from '../data';

const Main = () => {
  const [filteredColors, setFilteredColors] = useState([]);

  const handleFilterChange = (color) => {
    if (filteredColors.includes(color)) {
      setFilteredColors(prevColors => prevColors.filter(c => c !== color));
    } else {
      setFilteredColors(prevColors => [...prevColors, color]);
    }
  };

  const filteredProducts = products.filter(product => 
    filteredColors.length === 0 || product.color.some(c => filteredColors.includes(c))
  );

  return (
    <div>
      <div>
        {filteredProducts.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <div>
        <Filter colors={colors} onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
}

export default Main;
