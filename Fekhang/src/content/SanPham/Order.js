import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderDetail from "./OrderDetail";
import { useNavigate } from "react-router-dom";
import customAxios from '../../CustomAxios/customAxios';
import VNPayPayment from "./VNPayPayment";
import { useAuth } from "./Context/AuthContext";
import './Scss/Order.scss';
import { Grid } from '@mui/material';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import ConfirmEmail from "./ConfirmEmail";
const Order = () => {
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [voucherCode, setVoucherCode] = useState("");
  const navigate = useNavigate();
  const orderId = localStorage.getItem('orderId');

  const fetchOrder = async () => {
    try {
      const response = await customAxios.get(`/order/list/${orderId}`);
      if (response.data) {
        setOrder(response.data);
      } else {
        console.error("Dữ liệu không hợp lý từ API:", response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const deleteOrderDetail = async (orderDetailId) => {
    try {
      await customAxios.delete(`/order_detail/delete/${orderDetailId}`);
      // Sau khi xóa thành công, cập nhật state để trigger lại render
      setOrder(prevOrder => ({ ...prevOrder, orderDetails: prevOrder.orderDetails.filter(item => item.id !== orderDetailId) }));
      fetchOrder();
    } catch (error) {
      console.error("Lỗi khi xóa order detail:", error);
    }
  };
  const applyVoucher = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/cageshop/api/voucher-usage/add-by-voucher',
        {
          usedAt: new Date().toISOString(),
          userId: user.userId,
          orderId: orderId,
          codeVoucher: voucherCode
        }
      );

      console.log('Mã giảm giá áp dụng thành công:', response.data);
      // Gọi lại fetchOrder() sau khi áp dụng mã giảm giá
      fetchOrder();

    } catch (error) {
      console.error('Lỗi khi áp dụng mã giảm giá:', error);
    }
  };

  return (
    <div className="order-container">
      {order && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            {order.orderDetails.length > 0 && (
              <OrderDetail orderId={order.id} deleteOrderDetail={deleteOrderDetail} />

            )}
          </Grid>
          <Grid className="voucher-pay" item xs={12} md={4}>
            {order.orderDetails.length > 0 && (
              <div className="pay-area">
                <div className="voucher-input">

                  <TextField
                    id="outlined-uncontrolled"
                    label="Nhập mã voucher"
                    defaultValue="foo"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />

                  <Button onClick={applyVoucher} variant="outlined" >
                    Áp dụng
                  </Button>

                </div>

                <div className="total-price">
                  <div style={{fontSize: '1rem', marginRight:'1rem'}}> Total Price: </div>
                  <div>ship-price {order.shipPrice} VND </div>
                  <div>

                  {order.total_price} VND</div>
                </div>
                  <ConfirmEmail />
                {/* <VNPayPayment /> */}
              </div>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Order;
