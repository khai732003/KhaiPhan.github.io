import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cageshop/api/order_detail/list');
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy order details:", error);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <ul>
        {orderDetails.map((item) => (
          <li key={item.id}>
            {/* Hiển thị thông tin của OrderDetail */}
            <div>ID: {item.id}</div>
            <div>Product: {item.note}</div>
            <div>Quantity: {item.quantity}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
