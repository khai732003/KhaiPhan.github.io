// import React from 'react';
// import { useCart } from '../Context/CartContext';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import { useAuth } from '../Context/AuthContext';
// const Navigation = () => {
//   const {logout} = useAuth();
//     const { isCartOpen, toggleCart } = useCart();
    
//     const location = useLocation();

//   // Kiểm tra xem người dùng có đang ở trang đăng nhập hoặc đăng ký không
//   const isLoginPage = location.pathname === '/login';
//   const isRegisterPage = location.pathname === '/register';
//   const isSuccess = location.pathname === '/paysuccess';

//   const handleOnLogout=() => {
//     logout();
//   }

//   // Nếu người dùng đang ở trang đăng nhập hoặc đăng ký, ẩn Navigation
//   if (isLoginPage || isRegisterPage || isSuccess) {
//     return null;
//   }
//     return (
//       <div className="navigation">
//         <Link to="/">HOME</Link>
//         <button className="cart-button" onClick={toggleCart}>
//           <ShoppingCartIcon />
//         </button>
//         <Link to="/login"> Login</Link>
//         <Link to="/register"> Register</Link>
//         <button onClick={handleOnLogout}>Logout</button>
//       </div>
//     );
//   };

// export default Navigation;
