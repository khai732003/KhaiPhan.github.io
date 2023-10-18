import React from 'react';
import { useCart } from './Context/CartContext';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, List, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CartItem from "./CartItem";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart } = useCart();

  const totalCartPrice = cart.reduce((total, item) => total + item.totalPrice, 0);

  const navigate = useNavigate();

  const handleOrderClick = async () => {
    try {
      const shipAddress = "hcm";
      const shipPrice = shipAddress === "hcm" ? 10.0 : 20.0;

      const orderResponse = await axios.post('http://localhost:8080/cageshop/api/order/add', {
        status: "pending",
        paymentMethod: "VNP",
        shipAddress: shipAddress,
        shipPrice: shipPrice,
        content: "Đóng gói cẩn thận nhé",
        shipDate: "CC",
        total_price: totalCartPrice,
        userId: 1
      });

      const orderId = orderResponse.data.id;

      for (const item of cart) {
        await axios.post('http://localhost:8080/cageshop/api/order_detail/add', {
          quantity: 1,
          hirePrice: item.hirePrice,
          totalOfProd: item.totalOfProd,
          note: "CC",
          orderId: orderId,
          productId: item.id,
          totalCost: item.totalPrice
        });
      }

      toggleCart(); // Đóng cart sau khi đặt hàng thành công

      navigate(`order/${orderId}`);

    } catch (error) {
      console.error("Lỗi khi tạo order và order detail:", error);
    }
  };

  return (
    <Dialog open={isCartOpen} onClose={toggleCart} className="cart-dialog">
      <DialogTitle className="dialog-title">Shopping Cart</DialogTitle>
      <IconButton aria-label="close" className="close-button" onClick={toggleCart}>

      </IconButton>
      <DialogContent className="shopping-cart">
        <List>
          {cart.map((item) => (

            <CartItem key={item.id} item={item}  />
          ))}
        </List>
        <div className="total-price">
          Total: <span className="price">${totalCartPrice.toFixed(2)}</span>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleOrderClick}>
          Order Now
        </Button>
        <Button variant="contained" onClick={toggleCart}>
          Continue Shopping
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default Cart;
