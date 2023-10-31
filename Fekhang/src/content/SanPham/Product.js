import React, { useState } from "react";
import "./Scss/Product.scss"; // Import CSS file
import { useCart } from "./Context/CartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAuth } from "./Context/AuthContext";
import customAxios from '../../CustomAxios/customAxios';

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Product = ({ id, name, stock, totalPrice, productImage, code, cage, accessories }) => {

  const accessoriesList = accessories.map((accessory) => accessory.description).join(', ');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  let orderId = localStorage.getItem('orderId');

  const handleAddToCart = () => {
    addToCart({ id, name, stock, totalPrice, productImage, code, cage, accessories});
    window.alert(`Added ${name} to the cart!`);
  };

  const handleOnDetail = (id) => {
    navigate(`/detail/${id}`)// điền vô product detail
  }
  const handleBuy = async (id) => {
    if (!user) {
      navigate("/login")
      return;
    }
    try {

      if (!orderId) {
        const shipAddress = "hcm";
        const shipPrice = shipAddress === "hcm" ? 10.0 : 20.0;

        const orderResponse = await customAxios.post('/order/add', {
          "name": "Tổng hóa đơn",
          "status": "pending",
          "paymentMethod": "credit card",
          "address": "137 Đặng Văn Bi",
          "city": "Đà Nẵng",
          "content": "Đóng gói cẩn thận nhé",
          "shipDate": "2023-10-15",
          userId: user.userId
        });

        orderId = orderResponse.data.id;
        localStorage.setItem('orderId', orderId);
      }

      const product = { id, name, stock, totalPrice, productImage, code, cage, accessories };
      
      await customAxios.post('/order_detail/add', {
        quantity: 1,
        hirePrice: product.hirePrice,
        totalOfProd: product.totalOfProd,
        name : product.cage.description,
        note: `Sản phẩm là ${product.id}`,
        orderId,
        productId: product.id,
        totalCost: product.totalPrice
      });

      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error("Lỗi khi tạo order và order detail:", error);
    }
  };


  return (
    <div className="col-md-12 container-product" >
      <div className="product-card card md-4 custom-height">
        <div className="card-product" onClick={() => handleOnDetail(id)}>
          <img src={productImage} alt={name} className="card-img-top" />
          <div className="card-body" >
            <div className="card-info">
            {/* <div className="card-text">Id: {id}</div> */}
              <h5 className="card-title">{cage.description}</h5>
              <div className="card-text" >Stock: {stock}</div>
              <div className="card-text">Code: {code}</div>
              <div className="accessories-list">
                Accessories: {accessoriesList}
              </div>
              
              
              <div className="card-text" style={{fontWeight: '700', fontSize:'1.3rem'}} >Price: {totalPrice} VND</div>
            </div>


          </div>
        </div>



        <div className="click-buy-addcart">
          <Button className="custom-button" variant="outlined" startIcon={<AddShoppingCartIcon />} onClick={handleAddToCart}>
            Add To Cart
          </Button>
          <Button className="custom-button" variant="contained" startIcon={<AttachMoneyIcon />} onClick={() => handleBuy(id)}>
            Buy now
          </Button>
        </div>



      </div>
    </div>
  );
};

export default Product;