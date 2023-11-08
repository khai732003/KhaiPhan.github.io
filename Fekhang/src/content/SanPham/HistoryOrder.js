import React, { useEffect, useState } from 'react';
import customAxios from '../../CustomAxios/customAxios'; // Thay đường dẫn đến customAxios bằng đường dẫn thực tế
import { useAuth } from './Context/AuthContext';

export default function HistoryOrder() {
    const [orders, setOrders] = useState([]);
    const {user} = useAuth();
    const userId = user.userId;
    useEffect(() => {
        // Gọi API sử dụng customAxios để lấy danh sách các đơn hàng đã thanh toán của người dùng với userId là 3
        customAxios.get(`/order/list-by-user-and-pay-status/${userId}/PAID`)
            .then(response => {
                // Lưu kết quả trả về vào state
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div style={{paddingTop:'7rem'}}>
            <h2>Lịch sử đơn hàng</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <strong>Mã đơn hàng:</strong> {order.id}<br />
                        <strong>Ngày tạo:</strong> {new Date(order.createDate).toLocaleString()}<br />
                        <strong>Địa chỉ:</strong> {order.address}<br />
                        <strong>Giá ship:</strong> {order.shipPrice}<br />
                        <strong>Tổng giá:</strong> {order.total_price}<br />
                        {/* Hiển thị thông tin về sản phẩm trong đơn hàng */}
                        <ul>
                            {order.orderDetails.map(product => (
                                <li key={product.id}>
                                    <strong>Tên sản phẩm:</strong> {product.name}<br />
                                    <strong>Số lượng:</strong> {product.quantity}<br />
                                    <strong>Tổng giá sản phẩm:</strong> {product.totalCost}
                                </li>
                            ))}
                        </ul>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}
