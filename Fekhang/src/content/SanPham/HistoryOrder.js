import React, { useEffect, useState } from 'react';
import customAxios from '../../CustomAxios/customAxios'; // Thay đường dẫn đến customAxios bằng đường dẫn thực tế
import { useAuth } from './Context/AuthContext';
import { Container, Typography, Paper, Divider, Grid } from '@mui/material';
import './Scss/HistoryDetail.scss'
export default function HistoryOrder() {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();
    const userId = user.userId;
    useEffect(() => {
        // Gọi API sử dụng customAxios để lấy danh sách các đơn hàng đã thanh toán của người dùng với userId là 3
        customAxios.get(`/order/list-by-user-and-pay-status/${userId}/PAID`)
            // customAxios.get('https://654cb02e77200d6ba8593b51.mockapi.io/Data')
            .then(response => {
                // Lưu kết quả trả về vào state
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <Container className="history-order-container">
            <Typography variant="h4" className="header" gutterBottom>
                Lịch sử đơn hàng
            </Typography>
            {orders.map(order => (
                <Paper key={order.id} elevation={3} className="order-paper">
                    <Grid container spacing={2}>
                        {/* Left column for product image */}
                        <Grid item xs={12} sm={6}>
                            {/* Add the image component here */}
                            <img src={order.imageUrl} alt={order.name} className="product-image" style={{ width: '80%', maxHeight: '300px', borderRadius: '3px' }} />
                        </Grid>
                        {/* Right column for order details */}
                        <Grid item xs={12} sm={6} style={{ textAlign: 'left' }}>
                            <Typography variant="h6" className="order-id" gutterBottom>
                                Mã đơn hàng: {order.id}
                            </Typography>
                            <Typography className="order-info">
                                Ngày tạo:<span style={{ fontWeight: '80', color: 'rgb(60,179,113)' }}> {new Date(order.createDate).toLocaleString()}</span><br />
                                Địa chỉ: {order.address}<br />
                                Giá ship: {order.shipPrice}<br />
                                Tổng giá: <span style={{ color: 'rgb(127,255,0)' }}>{order.total_price}</span><br />
                            </Typography>
                            {/* Render product details */}
                            {order.orderDetails.map(product => (
                                <div key={product.id} className="order-details">
                                    <Typography variant="subtitle1" gutteBottom className="product-info">
                                        Tên sản phẩm: {product.name}<br />
                                        Số lượng: {product.quantity}<br />
                                        Tổng giá sản phẩm: {product.totalCost}
                                    </Typography>
                                </div>
                            ))}
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Container>
    );
}
