import React, { useEffect, useState } from 'react';
import customAxios from '../../CustomAxios/customAxios'; // Thay đường dẫn đến customAxios bằng đường dẫn thực tế
import { useAuth } from './Context/AuthContext';
import { Container, Typography, Paper, Divider, Grid, StepLabel, Step, Box, Stepper, Button } from '@mui/material';
import './Scss/HistoryDetail.scss'
import { useNavigate } from 'react-router-dom';
export default function HistoryOrder() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const steps = [
    'CONFIRMED',
    'DELIVERING',
    'DELIVERED',
  ];

  const getStepNumber = (shipStatus) => {
    switch (shipStatus) {
      case 'NOT-CONFIRMED':
        return 0;
      case 'CONFIRMED':
        return 1;
      case 'DELIVERING':
        return 2;
      case 'DELIVERED':
        return 3;
      default:
        return 0; // Set a default step number if the status is unknown
    }
  };
  const handleFeedBack = (productId) => {
    navigate(`/detail/${productId}`)
  }

  return (
    <Container className="history-order-container">
      <Typography variant="h4" className="header" gutterBottom>
        Lịch sử đơn hàng
      </Typography>
      {orders.map(order => (
        <Paper key={order.id} elevation={3} className="order-paper">
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Box sx={{ width: '100%' }}>
                <Stepper activeStep={getStepNumber(order.shipStatus)} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Grid>
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

            </Grid>

            <Grid item xs={12} sm={6}>
              {order.orderDetails.map(product => (
                <div key={product.id} className="order-details">
                  <Typography variant="subtitle1" gutteBottom className="product-info">
                    {product.name} x{product.quantity}<br />
                    Tổng giá sản phẩm: {product.totalCost}
                  </Typography>
                  {order.shipStatus === 'DELIVERED' && (
                    <Button onClick={() => handleFeedBack(product.productId)}>FeedBack</Button>
                  )}
                </div>
              ))}
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
}
