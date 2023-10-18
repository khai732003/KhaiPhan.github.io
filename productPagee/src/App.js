import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductPage from './SanPham/ProductPage';
import ContactPage from './components/ContactPage';
import { CartProvider } from './SanPham/Context/CartContext'; // Import CartProvider
import Navigation from './SanPham/Navigation/Navigation'; 
import {
  Routes,
  Route,
} from "react-router-dom";
import Order from "./SanPham/Order";
import VNPayPayment from "./SanPham/VNPayPayment";

function App() {
  return (
    <div className="App">
      <CartProvider> {/* Wrap your entire application with CartProvider */}
        <Navigation /> {/* Render Navigation component */}
        <Routes>

          <Route path="/" element={<ProductPage />} />
          <Route path="/order/:orderId" element={<Order />} />
          <Route path="/payment/:orderId" element={<VNPayPayment />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
