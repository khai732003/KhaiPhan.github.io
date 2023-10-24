import React, { useEffect, useState } from 'react';
import { useCart } from './Context/CartContext';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, List, Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CartItem from "./CartItem";
import axios from "axios";
import { Empty } from 'antd';
import { useNavigate} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import "../SanPham/Scss/cart.scss"
import { useAuth } from './Context/AuthContext';
import customAxios from './CustomAxios/customAxios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
const Cart = () => {
  const {user} = useAuth();
  const { cart, isCartOpen, toggleCart, clearCart } = useCart();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const totalCartPrice = cart.reduce((total, item) => total + item.totalPrice, 0);
  const isCartEmpty = cart.length === 0;
  const navigate = useNavigate();
  let orderId = localStorage.getItem('orderId');

  const handleOrderListClick = () => {
    navigate(`/order/${orderId}`)
  }

  const handleOrderClick = async () => {

    if(!user){
      navigate("/login")
      return;
    }
    console.log(user)

    if (isCartEmpty) {
      setIsSnackbarOpen(true);
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
          total_price: totalCartPrice,
          userId: user.userId
        });

  
        orderId = orderResponse.data.id;
        localStorage.setItem('orderId', orderId);
      }
  
      for (const item of cart) {
        await customAxios.post('/order_detail/add', {
          quantity: 1,
          hirePrice: item.hirePrice,
          totalOfProd: item.totalOfProd,
          note: `Sản phẩm là ${item.id} `,
          orderId: orderId,
          productId: item.id,
          totalCost: item.totalPrice
        });
      }
  
      toggleCart();
      clearCart();
      navigate(`order/${orderId}`);
    } catch (error) {
      console.error("Lỗi khi tạo order và order detail:", error);
    }
  };
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };


  return (
    <>
    
    <Dialog open={isCartOpen} onClose={toggleCart} className="cart-dialog">
      <DialogTitle className="dialog-title"><div>Shopping Cart</div> <Button variant="contained" onClick={toggleCart}>
      <CloseIcon/>
          </Button></DialogTitle>
      {cart.length > 0 ? (
          <DialogContent className="shopping-cart">
            <List>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </List>
          </DialogContent>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      <div className="option-cart">
        <div className="total-price">
          Total: <span className="price">{totalCartPrice.toFixed(2)} VND</span>
        </div>
        <DialogActions>
        <Button variant="contained" color="primary" onClick={handleOrderListClick}>
            Order List
          </Button>
          <Button variant="contained" color="primary" onClick={handleOrderClick}>
            Order Now
          </Button>
          
        </DialogActions>
      </div>
    </Dialog>

    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert onClose={handleCloseSnackbar} severity="error">
        CART IS EMPTY NOW !!!
      </MuiAlert>
    </Snackbar>
  </>

  );
};

export default Cart;
