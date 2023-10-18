// Product.js
import React, { useState, useEffect } from "react";
import "./Product.css"; // Import CSS file
import { Link } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
const Product = ({ id, name, productImage, price, code, onAddToCart }) => {
  const [productsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3; // Number of items per page

  useEffect(() => {
    fetch('https://652b64fe4791d884f1fdc2d3.mockapi.io/swp/products')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNewsData(data);
        } else {
          console.error('Data from API is not an array:', data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
      <div className="col-md-12">
        {productsData.map((items, index) => (
          <div className="product-card card mb-4">
            {/* chua lay API */}
            <img src='https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070' alt={items.name} className="card-img-top" />
            <div className="card-body">
              <p className="card-text">Name: {items.name}</p>
              <p className="card-text">Price: ${items.totalPrice}</p>
              <p className="card-text">Code: {items.code}</p>
              <p>
                <button className="column-button"><Link to={`productdetail/${items.id}`}>Detail</Link> </button>
              </p>
              <button onClick={onAddToCart}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
  )
};

export default Product;
