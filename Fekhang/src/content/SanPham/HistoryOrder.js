import React, { useEffect, useState } from 'react';
import customAxios from '../../CustomAxios/customAxios'; // Thay đường dẫn đến customAxios bằng đường dẫn thực tế
import { useAuth } from './Context/AuthContext';
import { Container, Typography, Paper, Divider, Grid, StepLabel, Step, Box, Stepper, Button } from '@mui/material';
import './Scss/HistoryDetail.scss'
import { useNavigate } from 'react-router-dom';
export default function HistoryOrder() {
  const [checkF, setCheckF] = useState(false);
  const [orders, setOrders] = useState([]);
  const [listDetail, setListDetail] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Gọi API sử dụng customAxios để lấy danh sách các đơn hàng đã thanh toán của người dùng với userId là 3
    customAxios.get(`/order/list-by-user-and-pay-status/${user.userId}/PAID`)
      .then(response => {
        // Lưu kết quả trả về vào state
        setOrders(response.data);
  
        // Accumulate all orderDetails into a single list
        const allOrderDetails = response.data.reduce((acc, order) => {
          return acc.concat(order.orderDetails);
        }, []);
  
        // Set listDetail to the accumulated orderDetails
        setListDetail(allOrderDetails);
  
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  
  useEffect(() => {
    console.log(listDetail);
  
    // Extract and log the IDs of each orderDetail
    const orderDetailIds = listDetail.map(orderDetail => orderDetail.id);
    console.log('OrderDetail IDs:', orderDetailIds);
  }, [listDetail]);
  

  const handleFeedBack = (productId) => {
    navigate(`/addfeedback/${productId}`);
  };

  // useEffect(() => {
  //   const checkUserPurchase = async () => {
  //     try { 
  //       const orderDetailIds = listDetail.map(orderDetail => orderDetail.id);
        
  //       const response = await customAxios.get(`/feedback/check-by-orderdetail/${orderDetailIds}`);
  //       setCheckF(response.data);
  //       console.log(response.data)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  
  //   checkUserPurchase();
  // }, [listDetail]);
  // console.log(checkF)
  

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
                Code: {order.id}
              </Typography>
              <Typography className="order-info">
                Create Date :<span style={{ fontWeight: '80', color: 'rgb(60,179,113)' }}> {new Date(order.createDate).toLocaleString()}</span><br />
                Address: {order.address}<br />
                Total Price: <span style={{ color: 'rgb(127,255,0)' }}>{order.total_price}</span><br />
              </Typography>

            </Grid>

            <Grid item xs={12} sm={6}>
              {order.orderDetails.map(product => (
                <div key={product.id} className="order-details">
                  <Typography variant="subtitle1" gutteBottom className="product-info">
                    {product.name} x{product.quantity}<br />
                    Total product price: {product.totalCost}
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
