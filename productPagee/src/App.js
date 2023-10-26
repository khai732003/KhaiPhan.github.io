
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductPage from './SanPham/ProductPage';
// import ContactPage from './components/ContactPage';
import { CartProvider } from './SanPham/Context/CartContext';
import Navigation from './SanPham/Navigation/Navigation';
import {
  Routes,
  Route,
} from "react-router-dom";

import Order from "./SanPham/Order";
import VNPayPayment from './SanPham/VNPayPayment';
import Login from './SanPham/Login';
import Register from './SanPham/Register';
import { AuthProvider } from "./SanPham/Context/AuthContext";
import Success from './SanPham/Success';

function App() {
  return (
    <div className="App">
<AuthProvider>
<CartProvider>
          <Navigation />
          <Routes>
            <Route path="/paysuccess" element={<Success />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProductPage />} />
            <Route path="/order/:orderId" element={<Order />} />
            {/* <Route path="/payment/:orderId" element={<VNPayPayment />} /> */}
          </Routes>
        </CartProvider>
</AuthProvider>


    </div>
  );
}

export default App;
