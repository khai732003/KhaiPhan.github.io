import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate()
  useEffect(() => {
    // Đặt hẹn giờ để chuyển hướng sau 3 giây
    const redirectTimeout = setTimeout(() => {
      localStorage.removeItem('orderId');
      // Chuyển hướng đến localhost:3000
      navigate('/')
    }, 3000);

    // Hủy hẹn giờ khi component bị unmount
    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []); 

  return <div>Success</div>;
}
