import React, { useState, useEffect } from "react";
import customAxios from '../../CustomAxios/customAxios';
import OrderDetail from "./OrderDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import ConfirmEmail from './ConfirmEmail';
import './Scss/Order.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
} from '@mui/material';

const Order = () => {
  const {orderId1} = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherData, setVoucherData] = useState([]);
  const navigate = useNavigate();
  const orderId = localStorage.getItem('orderId');

  const [discountedPrices, setDiscountedPrices] = useState([]);
  const [deleted, setDeleted] = useState(false);

  const fetchDiscountedPrices = async () => {
    try {
      const prices = await getDiscountedPrices();
      setDiscountedPrices(prices);
    } catch (error) {
      console.error('Error fetching discounted prices:', error);
    }
  };

  const fetchData = async () => {
    try {
      await fetchOrder();
      await fetchDiscountedPrices();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orderId, voucherCode]);
  const fetchVoucherData = async () => {
    try {
      const response = await customAxios.get('/voucher/get-all');
      if (response.data) {
        setVoucherData(response.data);
      } else {
        console.error('Invalid data from API:', response.data);
      }
    } catch (error) {
      console.error('Error fetching voucher data:', error);
    }
  };

  useEffect(() => {
    fetchVoucherData();
  }, []); // Fetch data on component mount

  const fetchOrder = async () => {
    try {
      const orderResponse = await customAxios.get(`/order/list/${orderId}`);
      if (orderResponse.data) {
        const orderData = orderResponse.data;

        setOrder(orderData);
      } else {
        console.error('Invalid data from API:', orderResponse.data);
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  const getDiscountedPrices = async () => {
    try {
      const response = await customAxios.get(`/voucher-usage/get-all-price-by/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching discounted prices:', error);
      return [];
    }
  };
  useEffect(() => {
    // Check if the user has any orders
    const fetchData = async () => {
      try {
        const response = await customAxios.get(`/order/exists/${orderId1}/${user.userId}`);
        console.log(response.data);
        console.log(user.userId)
        if (!response.data) {

          navigate('/');
        }
      } catch (error) {
        console.error('Error checking orders existence:', error);
      }
    };
  
    fetchData();
  }, [user.userId]);
  

  useEffect(() => {
    fetchOrder();
    fetchDiscountedPrices();
    setDeleted(false)
  }, [orderId, voucherCode, deleted]);

  const deleteOrderDetail = async (orderDetailId) => {
    try {
      await customAxios.patch(`/order_detail/delete-by/${orderDetailId}`);
      setOrder((prevOrder) => ({
        ...prevOrder,
        orderDetails: prevOrder.orderDetails.filter((item) => item.id !== orderDetailId),
      }));
      fetchOrder();
    } catch (error) {
      console.error("Error deleting order detail:", error);
    }
  };
  const deleteVoucherUsage = async (price) => {
    try {
      const response = await customAxios.patch(`/voucher-usage/delete-voucher/${price.orderId}/${price.code}`);

      setDeleted(true);
      if (response.status === 200) {
        console.log('VoucherUsage deleted successfully');
      } else {
        console.error('Failed to delete VoucherUsage');
      }
    } catch (error) {
      console.error('Error deleting VoucherUsage:', error);
    }
  }

  const applyVoucher = async () => {
    try {
      const response = await customAxios.post('/voucher-usage/add-by-voucher', {
        userId: user.userId,
        orderId: orderId,
        codeVoucher: voucherCode,
      });
      await fetchOrder();
      await fetchDiscountedPrices();
    } catch (error) {
      console.error('Lỗi khi áp dụng mã giảm giá:', error);
    }
  };
  function formatCurrency(amount) {
    return amount.toLocaleString('en-US');
  }
  return (
    <div className="order-container">
      {order && order.orderDetails.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} className="order-detail-container">
            <OrderDetail orderId={order.id} deleteOrderDetail={deleteOrderDetail} />
          </Grid>
          <Grid className="voucher-pay" item xs={12} md={5}>
            <div className="pay-area">
              <div className="voucher-input">
                <FormControl>
                  <InputLabel id="voucher-label">Chọn mã voucher</InputLabel>
                  <Select
                    labelId="voucher-label"
                    className="input"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  >
                    {voucherData.map((voucher) => (
                      <MenuItem key={voucher.id} value={voucher.code} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          {voucher.code}
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button onClick={applyVoucher} variant="outlined">
                  Áp dụng
                </Button>
              </div>

              <Grid
                className="pay-info"
                container
                xs={12}
                md={12}
                justifyContent="center"
                alignItems="center"
              >
                <Grid className="info" container xs={12}>
                  <Grid className="local-info" item md={12} xs={12}>
                    <Grid container>
                      <Grid className="left" item md={6} xs={12}>
                        Customer Name:
                      </Grid>
                      <Grid className="right" item md={6} xs={12}>
                        {user.fullName}
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid className="left" item md={6} xs={12}>
                        Address:
                      </Grid>
                      <Grid className="right" item md={6} xs={12}>
                        {user.address}
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid className="left" item md={6} xs={12}>
                        Products price:
                      </Grid>
                      <Grid className="right" item md={6} xs={12}>
                        {formatCurrency(
                          order.orderDetails.reduce(
                            (totalPrice, orderDetail) => totalPrice + orderDetail.totalCost,
                            0
                          )
                        )}
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid className="left" item md={6} xs={12}>
                        Discount:
                      </Grid>
                      <Grid className="right" item md={6} xs={12}>
                        {discountedPrices && discountedPrices.length > 0 && (
                          <div>
                            {discountedPrices.map((price) => (

                              <Grid container>

                                <Grid key={price.id} item md={9} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <div>
                                    {price.code}
                                  </div>
                                  <div>
                                    {formatCurrency(-price.voucherAmount)}
                                  </div>

                                </Grid>
                                <Grid item md={3}>
                                  <Button onClick={() => deleteVoucherUsage(price)}>
                                    <DeleteIcon />
                                  </Button>
                                </Grid>
                              </Grid>

                            ))}

                          </div>

                        )}

                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid className="left" item md={6} xs={12}>
                        Total:
                      </Grid>
                      <Grid className="right" item md={6} xs={12}>
                        {formatCurrency(order.total_price)}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                className="confirm"
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <ConfirmEmail />
              </Grid>
            </div>
          </Grid>
        </Grid>
      ) : (
        <div className="not-product" >
          <Alert severity="info">NOT FOUND PRODUCT IN HERE</Alert>
        </div>

      )}
    </div>

  );
};

export default Order;
