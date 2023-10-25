import React, { useState, useEffect } from "react";
import customAxios from "./CustomAxios/customAxios";

const OrderDetail = () => {
  // const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  const orderId = localStorage.getItem('orderId');
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await customAxios.get(`http://localhost:8080/cageshop/api/order/list/${orderId}`);
        setOrder(orderResponse.data);
        console.log(orderResponse.data.total_price)
      } catch (error) {
        console.error("Lỗi khi lấy thông tin đơn hàng:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const deleteOrderDetail = async (orderDetailId) => {
    try {
      await customAxios.delete(`/order_detail/delete/${orderDetailId}`);
      // Sau khi xóa thành công, cập nhật lại danh sách order details hoặc thực hiện các công việc cần thiết.
      order()
    } catch (error) {
      console.error("Lỗi khi xóa order detail:", error);
    }
  };

  return (
    <div className="order-details">
      {order && (
        <div>

          <h3>Products in the Order:</h3>
          <ul>
            {order.orderDetails.map((item) => (
              <li key={item.id}>
                <div>Product ID: {item.productId}</div>
                <div><img src={item.productImg} alt="fix"/> </div>
                <div>Quantity: {item.quantity}</div>
                <div>Total Cost: {item.totalCost}</div>
                {/* Thêm nút "Xóa" và gắn hàm xóa vào sự kiện click */}
                <button onClick={() => deleteOrderDetail(item.id)}>Xóa</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
