import React, { useState } from "react";
import customAxios from '../../CustomAxios/customAxios';
const VNPayPayment = () => {
  const  orderId  = localStorage.getItem('orderId');

  const [orderInfo, setOrderInfo] = useState({
    vnp_OrderInfo: "Anh yeu em nhieu lam 1", // Thông tin đơn hàng
    orderId: orderId, // ID của đơn hàng
    vnp_BankCode: "NCB" 
  });

  const handlePayment = async () => {
    try {
      const response = await customAxios.post("/pay", orderInfo);

      console.log(response.data.url);
  

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Lỗi khi gọi API thanh toán VNPay:", error);

    }
  };
   
  return (
    <div className="vnpay-payment-container">
      <h2>Thanh toán bằng VNPay</h2>
      <button onClick={handlePayment}>Thanh toán ngay</button>
    </div>
  );
};

export default VNPayPayment;
