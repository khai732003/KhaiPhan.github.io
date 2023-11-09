import React, { useState, useEffect } from 'react';
import customAxios from '../../CustomAxios/customAxios';
import { useAuth } from './Context/AuthContext';
import ConfirmEmail from './ConfirmEmail';

export default function LocalOrder() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const userId = user.userId;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await customAxios.get(`/order/list-by-user/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []); // Gọi API khi component được tải lần đầu (tham số thứ hai là mảng rỗng)

  return (
    <div style={{ paddingTop: '7rem' }}>
      <h1>My Orders</h1>
      <div>
        {orders.map((order) => (
          <div key={order.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>Order ID: {order.id}</h2>
            <div>................................</div>
            <div>
              <strong>Total Price:</strong> {order.total_price}
            </div>
            <div>
              <strong>Ship Status:</strong> {order.shipStatus}
            </div>
            <div>
              <strong>Pay Status:</strong> {order.payStatus}
            </div>
            {order.payStatus === 'NOT_PAY'  && <div><ConfirmEmail orderId2={order.id} /></div>}
            {order.payStatus === 'PAID' && <div>Successful</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
