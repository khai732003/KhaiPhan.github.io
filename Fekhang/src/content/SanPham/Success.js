import React, { useEffect } from 'react';

export default function Success() {
  useEffect(() => {
    // Đặt hẹn giờ để chuyển hướng sau 3 giây
    const redirectTimeout = setTimeout(() => {
      localStorage.removeItem('orderId');
      // Chuyển hướng đến localhost:3000
      window.location.href = 'http://localhost:3000';
    }, 3000);

    // Hủy hẹn giờ khi component bị unmount
    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []); 

  return <div>Success</div>;
}
