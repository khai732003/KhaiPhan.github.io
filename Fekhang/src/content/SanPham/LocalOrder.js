import React, { useState, useEffect } from 'react';
import customAxios from '../../CustomAxios/customAxios';
import { useAuth } from './Context/AuthContext';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ConfirmEmail from './ConfirmEmail';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import VerifiedIcon from '@mui/icons-material/Verified';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function LocalOrder() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = user.userId;
        const response = await customAxios.get(`/order/list-by-user/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
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

  return (
    <Container className="history-order-container">
      <Typography variant="h4" className="header" gutterBottom>
        My Orders
      </Typography>
      {orders.map(order => (
        <Paper key={order.id} elevation={3} className="order-paper">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} container>
              <Grid item sm={2}>
                <Typography variant="h6" className="order-id" gutterBottom>
                  CODE: {order.id}
                </Typography>
              </Grid>

              <Grid item sm={10}>
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

            </Grid>
            <Grid item xs={12} sm={4} style={{ textAlign: 'left' }}>

              <Typography className="order-info">
                Create Date: <span style={{ fontWeight: '80', color: 'rgb(60,179,113)' }}>{new Date(order.createDate).toLocaleString()}</span><br />
                Address: {order.address}<br />
                Ship price: {order.shipPrice}<br />
                Total: <span style={{ color: 'rgb(127,255,0)' }}>{order.total_price}</span><br />
              </Typography>

            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography>
              PRODUCT 
              </Typography>
            {order.orderDetails.map(product => (
                <div key={product.id} className="order-details">
                  <Typography variant="subtitle1" gutterBottom className="product-info">
                    {product.name} x{product.quantity}<br />
                    {/* Tổng giá sản phẩm: {product.totalCost} */}
                  </Typography>
                </div>
              ))}
            </Grid>

            <Grid item xs={12} sm={4} container direction="row"
              justifyContent="flex-end"
              alignItems="flex-end">
              <Grid item xs={12} sm={6}>

                {order.payStatus === 'NOT_PAY' && <div><ConfirmEmail orderId2={order.id} /></div>}
                {order.payStatus === 'PAID' && (
                  <div>
                    <Typography gutterBottom>
                      <VerifiedIcon fontSize="small" /> COMPLETE CONFIRM
                    </Typography>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
}
