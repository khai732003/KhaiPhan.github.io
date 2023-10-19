import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  // const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  const orderId = localStorage.getItem('orderId');
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await axios.get(`http://localhost:8080/cageshop/api/order/list/${orderId}`);
        setOrder(orderResponse.data);
        console.log(orderResponse.data.total_price)
      } catch (error) {
        console.error("Lỗi khi lấy thông tin đơn hàng:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div className="order-details">
      {order && (
        <div>

          <h3>Products in the Order:</h3>
          <ul>
            {order.orderDetails.map((item) => (
              <li key={item.id}>
                <div>Product ID: {item.productId}</div>
                <div><img src={item.productImg} alt="fix"/> </div>
                <div>Quantity: {item.quantity}</div>
                <div>Total Cost: {item.totalCost}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
