
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductPage from './SanPham/ProductPage';
import ContactPage from './components/ContactPage'

import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import OrderDetail from "./SanPham/OrderDetail";
import Order from "./SanPham/Order";
import VNPayPayment from "./SanPham/VNPayPayment";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/order/:orderId" element={<Order />} />
        <Route path="/payment/:orderId" element={<VNPayPayment />} />

      </Routes>
    </div>
  );
}

export default App;
