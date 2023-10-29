import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderDetail from "./OrderDetail";
import { useNavigate } from "react-router-dom";
import customAxios from '../../CustomAxios/customAxios';
import VNPayPayment from "./VNPayPayment";
import { useAuth } from "./Context/AuthContext";
import './Scss/Order.scss';
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

  const deleteOrderDetail = async (orderDetailId) => {
    try {
      await customAxios.delete(`/order_detail/delete/${orderDetailId}`);
      // Sau khi xóa thành công, cập nhật state để trigger lại render
      setOrder(prevOrder => ({ ...prevOrder, orderDetails: prevOrder.orderDetails.filter(item => item.id !== orderDetailId) }));
      fetchOrder();
    } catch (error) {
      console.error("Lỗi khi xóa order detail:", error);
    }
  };
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
      fetchOrder();

    } catch (error) {
      console.error('Lỗi khi áp dụng mã giảm giá:', error);
    }
  };

  return (
    <div className="order-container">

      <h1>Order Page</h1>

      {order && (

        <div key={order.id}>
          {order.orderDetails.length > 0 && (
            <>
              <div className="voucher-input">
                <input
                  type="text"
                  placeholder="Nhập mã voucher"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                />
                <button onClick={applyVoucher}>Áp dụng mã voucher</button>
              </div>
              <div>ID: {order.id}</div>
              <div>Status: {order.status}</div>
              <div>Payment Method: {order.paymentMethod}</div>
              <div>Ship Address: {order.shipAddress}</div>
              <div>Total Price: {order.total_price}</div>
            </>
          )}
          {order.orderDetails.length > 0 ? (
            <OrderDetail orderId={order.id} deleteOrderDetail={deleteOrderDetail} />
          ) : (
            <div>Giỏ hàng trống.</div>
          )}
          <VNPayPayment />
        </div>
      )}


    </div>
  );
};

export default Order;
