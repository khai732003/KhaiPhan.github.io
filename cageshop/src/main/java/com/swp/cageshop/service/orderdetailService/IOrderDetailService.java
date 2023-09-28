package com.swp.cageshop.service.orderdetailService;

import com.swp.cageshop.entity.OrderDetail;

import java.util.List;

public interface IOrderDetailService {
    OrderDetail addOrderDetail(OrderDetail orderDetail);

    OrderDetail updateOrderDetail(long id, OrderDetail orderDetail);

    boolean deleteOrderDetail(long id);

    List<OrderDetail> getAllOrderDetails();

    OrderDetail getOneOrderDetail(long id);
}
