import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const [count, setCount] = useState(4);
  const navigate = useNavigate()
  useEffect(() => {
    // Đặt hẹn giờ để chuyển hướng sau 3 giây
    const redirectTimeout = setTimeout(() => {
      localStorage.removeItem('orderId');
      // Chuyển hướng đến localhost:3000
      navigate('/')
    }, 4000);

    // Hủy hẹn giờ khi component bị unmount
    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>
    <div>THANH TOÁN THÀNH CÔNG 
    </div>
    <p> Về trang chủ sau {count}</p>
  </div>;
}
