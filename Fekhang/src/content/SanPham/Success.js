import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Scss/success.scss'

export default function Success() {
  const [count, setCount] = useState(4);
  const navigate = useNavigate()
  useEffect(() => {

    const redirectTimeout = setTimeout(() => {
      localStorage.removeItem('orderId');
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

  return (
    <div className='success'>
      <div style={{fontSize:'5rem'}}>
        THANH TOÁN THÀNH CÔNG
      </div>
      <div style={{fontSize:'3rem'}}> Về trang chủ sau {count}</div>
    </div>
  );
}
