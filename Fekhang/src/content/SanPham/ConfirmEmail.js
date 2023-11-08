import React, { useState } from 'react';
import axios from 'axios';
import customAxios from '../../CustomAxios/customAxios';

export default function ConfirmEmail() {
  const [confirmStatus, setConfirmStatus] = useState(null);
  let orderId = localStorage.getItem('orderId');
  const handleConfirmOrder = async () => {

    try {
      const response = await axios.get(`http://localhost:8080/confirmOrder?email=nguyenatony13@gmail.com&orderId=${orderId}`);
      // Xử lý dữ liệu trả về từ API nếu cần
      console.log(response.data);
      setConfirmStatus('Order confirmed successfully!');
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error confirming order:', error);
      setConfirmStatus('Failed to confirm order. Please try again later.');
    }
  };

  return (
    <div>
      <button onClick={handleConfirmOrder}>Confirm</button>
      {confirmStatus && <p>{confirmStatus}</p>}
    </div>
  );
}
