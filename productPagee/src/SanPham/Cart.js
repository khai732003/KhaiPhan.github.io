import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, List, ListItem, ListItemText, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Cart = ({ isOpen, cart, onClose, onDeleteItem }) => {
  const [cartItems, setCartItems] = useState(cart);
  const navigate = useNavigate();
  const calculateTotalPrice = () => {
    let total = 0;
    for (const product of cart) {
      total += product.totalPrice;
    }
    return total;
  };

  const totalCartPrice = calculateTotalPrice();

  const handleOrderClick = async () => {
    try {
      const shipAddress = "hcm"; // Thay đổi giá trị này dựa trên logic của bạn
      const shipPrice = shipAddress === "hcm" ? 10.0 : 20.0; // Sửa đổi dòng này

      const orderResponse = await axios.post('http://localhost:8080/cageshop/api/order/add', {
        status: "pending",
        paymentMethod: "VNP",
        shipAddress: shipAddress,
        shipPrice: shipPrice, // Sử dụng shipPrice dựa trên logic shipAddress
        content: "Đóng gói cẩn thận nhé",
        shipDate: "CC",
        total_price: totalCartPrice,
        userId: 1 
      });

      const orderId = orderResponse.data.id;

      for (const item of cart) {
        await axios.post('http://localhost:8080/cageshop/api/order_detail/add', {
          quantity: item.quantity,
          hirePrice: item.totalPrice,
          note: "CC",
          orderId: orderId,
          productId: item.id,
          totalCost: item.totalPrice
        });
      }

      onClose();
      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error("Lỗi khi tạo order và order detail:", error);
    }
  };

  const handleDelete = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    onDeleteItem(updatedCart);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle className="dialog-title">Shopping Cart</DialogTitle>
      <IconButton aria-label="close" className="close-button" onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogContent className="shopping-cart">
        <List>
          {cart.map((item, index) => (
            <ListItem key={index}>
              <ListItemText  primary={`${item.name} (ID: ${item.id})`}
              secondary={`Price: ${item.totalPrice}`} />
              <IconButton aria-label="delete" onClick={() => handleDelete(index)}> X</IconButton>
            </ListItem>
          ))}
        </List>
        <div className="total-price">Total: ${totalCartPrice.toFixed(2)}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOrderClick}>Order</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Cart;
