import React, { useState, useEffect } from "react";
import customAxios from '../../CustomAxios/customAxios';
import './Scss/Order.scss';
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
const OrderDetail = (props) => {
  const { deleteOrderDetail } = props;
  const [order, setOrder] = useState(null);
  const orderId = localStorage.getItem('orderId');

  const fetchOrderDetails = async () => {
    try {
      const orderResponse = await customAxios.get(`/order/list/${orderId}`);
      setOrder(orderResponse.data);
      console.log(orderResponse.data.total_price);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin đơn hàng:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]); // Gọi lại hàm khi orderId thay đổi

  const handleDeleteOrderDetail = async (orderDetailId) => {
    try {
      await deleteOrderDetail(orderDetailId); 
      await fetchOrderDetails(); 
    } catch (error) {
      console.error("Error deleting order detail:", error);
    }
  };

  function formatCurrency(amount) {
    // Sử dụng hàm toLocaleString để định dạng số với dấu phẩy ngăn cách hàng nghìn
    return amount.toLocaleString('en-US');
  }


  return (
    <div className="order-details">
      {order && (
        <div>
          <div className="container-orderdetail">
            {order.orderDetails.map((item) => (
              <div className="list-orderdetail" key={item.id}>
                <div><img src={item.productImg} alt="fix" /></div>
                <div className="orderdetail-name">
                  {/* <div>Product ID: {item.productId}</div> */}
                  {item.name}
                  <div className="quantity"> X{item.quantity}</div>
                </div>
                <div className="price">
                  <div>Total Cost: {formatCurrency(item.totalCost)}</div>
                </div>

                {/* Thêm nút "Xóa" và gắn hàm xóa vào sự kiện click */}
                <Button onClick={() => handleDeleteOrderDetail(item.id)} variant="outlined" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
