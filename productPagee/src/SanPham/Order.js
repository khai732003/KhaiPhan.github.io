import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderDetail from "./OrderDetail";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import VNPayPayment from "./VNPayPayment";
import { useParams } from "react-router-dom";  

const Order = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate(); // Sử dụng useNavigate hook để chuyển hướng

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/cageshop/api/order/list/${orderId}`);
        console.log(orderId)
        if (response.data) {
          setOrder(response.data);
        } else {
          console.error("Dữ liệu không hợp lý từ API:", response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      }
    };

    fetchOrder();
  }, []);

  const handlePaymentClick = () => {
    // Chuyển hướng đến trang thanh toán VNPayPayment khi nút được nhấn
    navigate(`/payment/${orderId}`);
  };

  return (
    <div className="order-container">
      <h1>Order Page</h1>
      {order && (
        <div key={order.id}>
          <div>ID: {order.id}</div>
          <div>Total Price: {order.total_price}</div>
          <OrderDetail orderId={order.id} />
          <button onClick={handlePaymentClick}>Thanh toán ngay</button>
        </div>
      )}
    </div>
  );
};

export default Order;
