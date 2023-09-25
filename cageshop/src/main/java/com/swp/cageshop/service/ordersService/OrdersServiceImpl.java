package com.swp.cageshop.service.ordersService;

import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersServiceImpl implements IOrdersService{
    @Autowired
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
            Orders orders1 = ordersRepository.getReferenceById(id);
            if(orders1!=null){
                orders1.setId(orders.getId());
                orders1.setOrderDate(orders.getOrderDate());
                return ordersRepository.save(orders1);
            }
        }
        return null;
    }

    @Override
    public boolean deleteOrders(long id) {
        if(id>1){
            Orders orders=ordersRepository.getReferenceById(id);
            if(orders!=null){
                ordersRepository.delete(orders);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }

    @Override
    public Orders getOneOrders(long id) {
        return ordersRepository.getReferenceById(id);
    }
}
