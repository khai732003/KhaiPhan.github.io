import React, { useEffect, useState } from 'react';
import { useCart } from './Context/CartContext';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, List, Button, Drawer } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CartItem from "./CartItem";
import axios from "axios";
import { Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import "../SanPham/Scss/cart.scss"
import { useAuth } from './Context/AuthContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import customAxios from '../../CustomAxios/customAxios';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';


// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
const Cart = () => {
  const { user } = useAuth();
  const { cart, isCartOpen, toggleCart, clearCart } = useCart();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isSnackbarOpen2, setIsSnackbarOpen2] = useState(false);

  const totalCartPrice = cart.reduce((total, item) => total + item.totalPrice, 0);
  const isCartEmpty = cart.length === 0;
  const navigate = useNavigate();
  const [isReturningFromLogin, setIsReturningFromLogin] = useState(false);
  let orderId = localStorage.getItem('orderId');

  const handleOrderListClick = () => {
    if (!orderId) {
      setIsSnackbarOpen2(true);
      return;
    }
    navigate(`/order/${orderId}`)
  }
  function formatCurrency(amount) {
    return amount.toLocaleString('en-US');
  }
  useEffect(() => {
    // Kiểm tra xem có quay trở lại từ Login.js hay không
    const storedIsReturningFromLogin = localStorage.getItem('isReturningFromLogin');
    const isCartReturn = localStorage.getItem('isCartReturn');
    if (storedIsReturningFromLogin === 'true' && isCartReturn === 'true' ) {
      setIsReturningFromLogin(true);
      
      localStorage.setItem('isCartReturn', 'false');
      localStorage.setItem('isReturningFromLogin', 'false');
    }
  }, []); 

  useEffect(() => {
    if (isReturningFromLogin) {
      handleOrderClick();
    }
  }, [isReturningFromLogin]);

  const handleOrderClick = async () => {

    if (!user) {
      localStorage.setItem('isCartReturn','true');
      navigate("/login")
      return;
    }

    if (isCartEmpty) {
      setIsSnackbarOpen(true);
      return;
    }
    try {

      if (!orderId) {
        // const shipAddress = "hcm";
        // const shipPrice = shipAddress === "hcm" ? 10000.0 : 20000.0;

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

      for (const item of cart) {
        await customAxios.post('/order_detail/add', {
          quantity: 1,
          hirePrice: item.hirePrice,

          name : item.name,
          // totalOfProd: item.totalOfProd,
          note: `Sản phẩm là ${item.id} `,
          orderId: orderId,
          productId: item.id,
          // totalCost: item.totalPrice
        });
      }

      toggleCart();
      clearCart();
      navigate(`/order/${orderId}`);
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

      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => isCartOpen}
        className="cart-drawer"
      >
        <div className="cart-content">
          <div className="dialog-title">
            <Button variant="outlined" className='button-close' onClick={() => isCartOpen}>
              <ArrowBackIosIcon />
            </Button>
            <div className='name-cart'>YOUR CART</div>

          </div>
          {cart.length > 0 ? (
            <div className="shopping-cart">
              <List>
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </List>
            </div>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}

        </div>
        <div className="option-cart">
          <div className="total-price">
            Total: <span className="price">{formatCurrency(totalCartPrice.toFixed(0))} VND</span>
          </div>
          <div className="dialog-actions">
            <Button variant="contained" color="primary" startIcon={<InventoryIcon />} onClick={handleOrderListClick}>
              Order List
            </Button>
            <Button variant="contained" color="primary" startIcon={<AttachMoneyIcon />} onClick={handleOrderClick}>
              Order Now
            </Button>
          </div>
        </div>
      </Drawer>



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

      {/* Snackbar cho trường hợp giỏ hàng trống */}
      <Snackbar
        open={isSnackbarOpen2}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen2(false)} // Đóng Snackbar khi người dùng nhấn nút đóng
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert onClose={() => setIsSnackbarOpen2(false)} severity="error">
          YOU SHOULD ORDER A PRODUCT !!!
        </MuiAlert>
      </Snackbar>
    </>

  );
};

export default Cart;
