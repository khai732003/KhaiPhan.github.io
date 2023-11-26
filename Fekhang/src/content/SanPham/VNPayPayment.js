import React, { useState, useEffect } from "react";
import customAxios from '../../CustomAxios/customAxios';
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

const VNPayPayment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [orderInfo, setOrderInfo] = useState({
    vnp_OrderInfo: "Anh yeu em nhieu lam 1", // Thông tin đơn hàng
    orderId: orderId, // ID của đơn hàng
    vnp_BankCode: "NCB"
  });

  const [hasRedirected, setHasRedirected] = useState(true);
  const [pay, setPay] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get(`/check/${orderId}`);
        const response1 = await customAxios.get(`/order/exists/${orderId}/${user.userId}`);
  
        // Check conditions for setting hasRedirected
        if (response.data === false && response1.data === true) {
          setHasRedirected(false);
        } else {
          setHasRedirected(true);
          navigate("/")
        }
  
        console.log(response.data);
  
        if (response.data) {
          console.log(hasRedirected);
          navigate('/');
        } 
      } catch (error) {
        console.error('Error checking orders existence:', error);
      }
    };
  
    fetchData();
  }, [orderId, user.userId, navigate, hasRedirected]);
  

  useEffect(() => {
    console.log(hasRedirected);
    // Chỉ chạy handlePayment khi fetchData đã hoàn tất
    if (hasRedirected === false) {
      const handlePayment = async () => {
        try {
          console.log(hasRedirected);
          // Kiểm tra xem đã chuyển hướng chưa
          const response = await customAxios.post('/pay', orderInfo);
          localStorage.removeItem('orderId');
          window.location.href = response.data.url;
        } catch (error) {
          console.error('Lỗi khi gọi API thanh toán VNPay:', error);
        }
      };
  
      handlePayment();
    }
  }, [hasRedirected]);
  

 

  return (
    <div className="vnpay-payment-container">
      <h2>Thanh toán bằng</h2>
      {/* Button không cần thiết ở đây vì hàm handlePayment được gọi tự động */}
    </div>
  );
};

export default VNPayPayment;
