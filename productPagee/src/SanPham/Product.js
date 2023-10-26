import React, { useState } from "react";
import "./Product.css"; // Import CSS file
import { useCart } from "./Context/CartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAuth } from "./Context/AuthContext";
import customAxios from "./CustomAxios/customAxios";

import { useNavigate } from "react-router-dom";
const Product = ({ id, name, stock, totalPrice, productImage, code }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  let orderId = localStorage.getItem('orderId');
  const handleAddToCart = () => {
    addToCart({ id, name, stock, totalPrice, productImage, code });
    window.alert(`Added ${name} to the cart!`);
  };

  const handleBuy = async () => {
    if (!user) {
      navigate("/login")
      return;
    }
    try {

      if (!orderId) {
        const shipAddress = "hcm";
        const shipPrice = shipAddress === "hcm" ? 10.0 : 20.0;

        const orderResponse = await customAxios.post('/order/add', {
          status: "pending",
          paymentMethod: "VNP",
          shipAddress: shipAddress,
          shipPrice: shipPrice,
          content: "Đóng gói cẩn thận nhé",
          shipDate: "today",
          // total_price: totalCartPrice,
          userId: user.userId
        });

        orderId = orderResponse.data.id;
        localStorage.setItem('orderId', orderId);
      }

      const product = { id, name, stock, totalPrice, productImage, code };

      await customAxios.post('/order_detail/add', {
        quantity: 1,
        hirePrice: product.hirePrice,
        totalOfProd: product.totalOfProd,
        note: `Sản phẩm là ${product.id}`,
        orderId,
        productId: product.id,
        totalCost: product.totalPrice
      });

      navigate(`order/${orderId}`);
    } catch (error) {
      console.error("Lỗi khi tạo order và order detail:", error);
    }
  };


  return (
    <div className="col-md-12">
      <div className="product-card card mb-4">
        <img src={productImage} alt={name} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">ID: {id}</p>
          <p className="card-text">Stock: {stock}</p>
          <p className="card-text">Price: ${totalPrice}</p>
          <p className="card-text">Code: {code}</p>

          <div className="buttons">
            <button className="column-button">Detail</button>
            <button onClick={handleAddToCart}>
              <AddShoppingCartIcon
                sx={{ color: 'blue', fontSize: '2rem' }}
              />
            </button>
            <button onClick={() => handleBuy(id)}>
              Buy now
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;