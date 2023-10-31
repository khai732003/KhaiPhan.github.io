import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderDetail from "./OrderDetail";
import { useNavigate } from "react-router-dom";
import customAxios from '../../CustomAxios/customAxios';
import VNPayPayment from "./VNPayPayment";
import { useAuth } from "./Context/AuthContext";

const Order = () => {
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const navigate = useNavigate();
  const orderId = localStorage.getItem('orderId');

  const fetchOrder = async () => {
    try {
      const response = await customAxios.get(`/order/list/${orderId}`);
      if (response.data) {
        setOrder(response.data);
      } else {
        console.error("Dữ liệu không hợp lý từ API:", response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const applyVoucher = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/cageshop/api/voucher-usage/add-by-voucher',
        {
          usedAt: new Date().toISOString(),
          userId: user.userId,
          orderId: orderId,
          codeVoucher: voucherCode
        }
      );

      console.log('Mã giảm giá áp dụng thành công:', response.data);
      // Gọi lại fetchOrder() sau khi áp dụng mã giảm giá
      const response1 = await customAxios.get(`/order/list/${orderId}`);
      fetchOrder();

    } catch (error) {
      console.error('Lỗi khi áp dụng mã giảm giá:', error);
    }
  };

  return (
    <div className="order-container">
      <div>
        c
      </div>
      <div>
        c
      </div>
      <div>
        c
      </div>
      <div>
        c
      </div>

      <h1>Order Page</h1>
      <div className="voucher-input">
        <input
          type="text"
          placeholder="Nhập mã voucher"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
        />
        <button onClick={applyVoucher}>Áp dụng mã voucher</button>
      </div>
      {order && (
        <div key={order.id}>
          <div>ID: {order.id}</div>
          <div>Status: {order.status}</div>
          <div>Payment Method: {order.paymentMethod}</div>
          <div>Ship Address: {order.shipAddress}</div>
          <div>Total Price: {order.total_price}</div>
          <OrderDetail orderId={order.id} />
          <VNPayPayment />
        </div>
      )}
    </div>
  );
};

export default Order;
