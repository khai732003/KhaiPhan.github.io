package com.swp.cageshop.service.ordersService;

import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.repository.OrdersRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersServiceImpl implements IOrdersService{

    private OrdersRepository ordersRepository;
    @Override
    public Orders addOrders(Orders orders) {
        if(orders!=null){
            return ordersRepository.save(orders);
        }
        return null;
    }

    @Override
    public Orders updateOrders(long id, Orders orders) {
        if(orders!=null){
            Orders orders1 = ordersRepository.getById(id);
            if(orders1!=null){
                orders1.setName(orders.getName());
                orders1.setAddress(orders.getAddress());
                return ordersRepository.save(orders1);
            }
        }
        return null;
    }

    @Override
    public boolean deleteOrders(long id) {
        return false;
    }

    @Override
    public List<Orders> getAllOrders() {
        return null;
    }

    @Override
    public Orders getOneOrders(long id) {
        return null;
    }
}
