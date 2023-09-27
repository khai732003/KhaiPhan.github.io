package com.swp.cageshop.service.ordersService;

import com.swp.cageshop.entity.Orders;

import java.util.List;

public interface IOrdersService {
    public Orders addOrders(Orders Orders);

//    public Orders updateOrders(long id, Orders Orders);

    public boolean deleteOrders(long id);

    public List<Orders> getAllOrders();

    public Orders getOneOrders(long id);
}
