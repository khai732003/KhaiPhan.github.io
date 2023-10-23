import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderDetail from "./OrderDetail";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Order = () => {
  // const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const orderId = localStorage.getItem('orderId');
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/cageshop/api/order/list/${orderId}`);

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
  }, [orderId]); 

 
  const handlePaymentClick = () => {
    navigate(`/payment/${orderId}`);
  };

  return (
    <div className="order-container">
      <h1>Order Page</h1>
      {order && (
        <div key={order.id}>
          <div>ID: {order.id}</div>
          <div>Status: {order.status}</div>
          <div>Payment Method: {order.paymentMethod}</div>
          <div>Ship Address: {order.shipAddress}</div>
          <div>Total Price: {order.total_price}</div>
          <OrderDetail orderId={order.id} />
          <button onClick={handlePaymentClick}>Thanh toán ngay</button>
        </div>
      )}
    </div>
  );
};

export default Order;
