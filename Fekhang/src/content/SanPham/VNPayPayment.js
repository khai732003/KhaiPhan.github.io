import React, { useState, useEffect } from "react";
import customAxios from '../../CustomAxios/customAxios';
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

const VNPayPayment = () => {
  const {orderId} = useParams();

  const [orderInfo, setOrderInfo] = useState({
    vnp_OrderInfo: "Anh yeu em nhieu lam 1", // Thông tin đơn hàng
    orderId: orderId, // ID của đơn hàng
    vnp_BankCode: "NCB"
  });

  const handlePayment = async () => {
    try {
      const response = await customAxios.post("/pay", orderInfo);
      localStorage.removeItem('orderId');
      window.location.href = response.data.url;

    } catch (error) {
      console.error("Lỗi khi gọi API thanh toán VNPay:", error);
    }
  };

  useEffect(() => {
    // Tự động gọi hàm handlePayment khi trang được tải
    handlePayment();
  }, []); // Truyền một mảng rỗng để đảm bảo hàm chỉ được gọi một lần sau khi trang được tải

  return (
    <div className="vnpay-payment-container">
      <h2>Thanh toán bằng</h2>
      {/* Button không cần thiết ở đây vì hàm handlePayment được gọi tự động */}
    </div>
  );
};

export default VNPayPayment;
