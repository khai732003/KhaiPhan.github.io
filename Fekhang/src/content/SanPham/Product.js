import React, { useState } from "react";
import "./Scss/Product.scss"; // Import CSS file
import { useCart } from "./Context/CartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAuth } from "./Context/AuthContext";
import customAxios from '../../CustomAxios/customAxios';

import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const Product = ({ id, name, stock, totalPrice, productImage, code }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  let orderId = localStorage.getItem('orderId');
  const handleAddToCart = () => {
    addToCart({ id, name, stock, totalPrice, productImage, code });
    window.alert(`Added ${name} to the cart!`);
  };

  const handleOnDetail = (id) => {
    navigate("/")// điền vô product detail
  }
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

      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error("Lỗi khi tạo order và order detail:", error);
    }
  };


  return (
    <div className="col-md-12 container-product" onClick={() => handleOnDetail(id)}>
      <div className="product-card card md-4 custom-height">
        <img src={productImage} alt={name} className="card-img-top" />
        <div className="card-body">
          <div className="card-info">
            <h5 className="card-title">{name}</h5>
            <div className="card-text">Stock: {stock}</div>
            <div className="card-text">Code: {code}</div>
            <div className="card-text">Price: ${totalPrice}</div>
          </div>


          <div className="buttons">
            {/* <div className="product-detail">
              <Button variant="contained" color="primary" className="deltail-button">
                Detail
              </Button>
            </div> */}

            <div className="click-buy-addcart">

              {/* <Button variant="contained" color="primary" >
                <AddShoppingCartIcon
                  sx={{ color: 'dark', fontSize: '2rem' }}
                />
              </Button> */}
              <Button variant="outlined" startIcon={<AddShoppingCartIcon />} onClick={handleAddToCart}>
                Add To Cart
              </Button>
              <Button variant="contained"   style={{ backgroundColor: '#ff1744', color: 'white' }}  startIcon={<AttachMoneyIcon/>} onClick={() => handleBuy(id)}>
                Buy now
              </Button>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;