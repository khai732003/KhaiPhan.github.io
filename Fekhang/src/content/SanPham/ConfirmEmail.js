import React, { useState, useEffect } from 'react';
import customAxios from '../../CustomAxios/customAxios';
import { useAuth } from './Context/AuthContext';
import { Button } from '@mui/material';
import './Scss/confirm.scss';

export default function ConfirmEmail({ orderId2 }) {
  const [confirmStatus, setConfirmStatus] = useState(null);
  const { user } = useAuth();

  let orderId = orderId2 || localStorage.getItem('orderId'); // Sử dụng orderId2 nếu được truyền vào, ngược lại sử dụng localStorage

  const handleConfirmOrder = async () => {
    try {
      const email = user.email;
      const response = await customAxios.get(`http://localhost:8080/confirmOrder?email=${email}&orderId=${orderId}`);
      // Xử lý dữ liệu trả về từ API nếu cần
      console.log(response.data);
      setConfirmStatus('Order confirmed successfully!');
      // Hiển thị prompt khi nhấn "Confirm"
      const confirmResult = window.confirm('Order confirmed successfully! Do you want to go to your Gmail?');
      if (confirmResult) {
        // Mở trang Gmail khi người dùng nhấn OK
        window.open('https://mail.google.com', '_blank');
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error confirming order:', error);
      setConfirmStatus('Failed to confirm order. Please try again later.');
    }
  };

  return (
    <div className='confirm'>
      <Button variant='contained' onClick={handleConfirmOrder}>Confirm Order</Button>
      {/* {confirmStatus && <p>{confirmStatus}</p>} */}
    </div>
  );
}
