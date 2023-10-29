import React, { useState } from "react";
import customAxios from '../../CustomAxios/customAxios';
import { Button } from "@mui/material";
const VNPayPayment = () => {
  const orderId = localStorage.getItem('orderId');

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
      <h2>Thanh toán bằng</h2>
      <Button  variant="contained" style={{height:'3.5rem'}} onClick={handlePayment}>
        <img style={{height:'100%', width:'100%'}} src='https://image4.owler.com/logo/vnpay_owler_20160302_230830_original.jpg' alt="noimg"/>
      </Button>

    </div>
  );
};

export default VNPayPayment;
