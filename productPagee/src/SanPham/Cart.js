
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, List, ListItem, ListItemText, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import React, { useState } from "react";
import axios from "axios";

const Cart = ({ isOpen, cart, onClose , onDeleteItem}) => {

  const [cartItems, setCartItems] = useState(cart); // Khai báo và khởi tạo giá trị ban đầu cho giỏ hàng

  const navigate = useNavigate(); // Sử dụng useNavigate hook để nhận hàm navigate

  const calculateTotalPrice = () => {
    let total = 0;
    for (const product of cart) {
      total += product.totalPrice;
    }
    return total;
  };

  const totalCartPrice = calculateTotalPrice();

  // const handleOrderClick = () => {
  //   onClose(); // Đóng dialog trước khi chuyển hướng
  //   navigate("/order", { state: { cart } }); // Truyền đối tượng state chứa thông tin Cart đến trang Order
  // };

  const handleOrderClick = async () => {
    // Tạo order trước đó sử dụng API
    try {
      const orderResponse = await axios.post('http://localhost:8080/cageshop/api/order/add', {
        // Thông tin order (thay thế các giá trị sau đây bằng dữ liệu thực của bạn)
        status: "pending",
        paymentMethod: "CC",
        shipAddress: "CC",
        shipPrice: 9.0,
        content: "Đóng gói cẩn thận nhé",
        shipDate: "CC",
        total_price: totalCartPrice,  // Giá trị tổng của giỏ hàng
        userId: 1
      });

      // Lấy ID của order mới tạo từ response
      const orderId = orderResponse.data.id;

      // Thêm các OrderDetail cho order sử dụng API
      for (const item of cart) {
        await axios.post('http://localhost:8080/cageshop/api/order_detail/add', {
          quantity: item.quantity,
          hirePrice: item.totalPrice,  // Giá của mỗi sản phẩm
          note: "CC",
          orderId: orderId,  // ID của order mới tạo
          productId: item.id,  // ID của sản phẩm trong giỏ hàng
          totalCost: item.totalPrice  // Giá của mỗi sản phẩm
        });
      }

      // Chuyển hướng đến trang Order sau khi thêm thành công
      onClose();
      navigate("/order");
    } catch (error) {
      console.error("Lỗi khi tạo order và order detail:", error);
    }
  };

  const handleDelete = (index) => {
    const updatedCart = [...cart];

    updatedCart.splice(index, 1); // xóa phần tử

    onDeleteItem(updatedCart);
  }
  
  
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
        <Button onClick={handleOrderClick}>Order</Button> {/* Sử dụng hàm handleOrderClick khi nút Order được nhấn */}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Cart;
