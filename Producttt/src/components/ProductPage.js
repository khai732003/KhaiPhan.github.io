import React, { useState, useEffect } from 'react';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const apiUrl = 'http://localhost:8080/cageshop/product/list';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <div className="container">
      <h1>Product Page</h1>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
