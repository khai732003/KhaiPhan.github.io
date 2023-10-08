// // ProductPage.js
// import React from "react";
// import Product from "./Product";
// import ProductFilters from "./ProductFilters";
// import sampleData from "./data"; 

// const ProductPage = () => {
//   const products = sampleData;

//   return (
    
//     <div className="container">
//       <div className="row">
//         <div className="col-lg-9">
//           <div className="row">
//             {products.map((product) => (
//               <div className="col-md-6" key={product.id}>
//                 <Product
//                   id={product.id}
//                   name={product.name}
//                   price={product.price}
//                   image={product.image}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="col-lg-3">
//           <ProductFilters products={products} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;




import React, { useState, useEffect } from "react";
import Product from "./Product";
import ProductFilters from "./ProductFilters";
import './ProductFilters.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    fetch("http://localhost:8080/cageshop/product/list") // thêm dùm bố cái url đi con trai
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); 
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu:", error);
        setIsLoading(false); 
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9">
          {isLoading ? (
            <p>Địt mẹ sản phẩm đang lên đỉnh...</p>
          ) : (
            <div className="row">
              {products
                .filter(
                  (product) =>
                    product.price >= minPrice && product.price <= maxPrice
                )
                .map((product) => (
                  <div className="col-md-6" key={product.id}>
                    <Product
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="col-lg-3">
        <ProductFilters products={products} />
        <div className="price-filter">
  <label>Chọn giá:</label>
  <input
    type="range"
    min="0"
    max="1000"
    step="10"
    value={minPrice}
    onChange={(e) => setMinPrice(Number(e.target.value))}
    className="price-input"
  />
  <input
    type="range"
    min="0"
    max="1000"
    step="10"
    value={maxPrice}
    onChange={(e) => setMaxPrice(Number(e.target.value))}
    className="price-input"
  />
  <div className="price-range">
    <span>Giá tối thiểu: ${minPrice}</span>
    <span>Giá tối đa: ${maxPrice}</span>
  </div>
</div>


        </div>
      </div>
    </div>
  );
};

export default ProductPage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [product, setProduct] = useState({});

//   useEffect(() => {
//     axios.get('http://localhost:8080/cageshop/product/list')
//       .then((response) => {
//         setProduct(response.data);
//       })
//       .catch((error) => {
//         console.error('Lỗi khi lấy dữ liệu từ API:', error);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <h1>{product.name}</h1>
//       <p>Code: {product.code}</p>
//       <p>Stock: {product.stock}</p>
//       {/* Các thông tin khác */}
//     </div>
//   );
// }

// export default App;


