package com.swp.cageshop.service.orderdetailService;

import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.repository.OrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements IOrderDetailService {

    @Autowired
    private OrderDetailsRepository orderDetailRepository;

    @Override
    public OrderDetail addOrderDetail(OrderDetail orderDetail) {
        if (orderDetail != null) {
            return orderDetailRepository.save(orderDetail);
        }
        return null;
    }

    @Override
    public OrderDetail updateOrderDetail(long id, OrderDetail orderDetail) {
        if (orderDetail != null) {
            OrderDetail existingOrderDetail = orderDetailRepository.getOne(id);
            if (existingOrderDetail != null) {
                // Cập nhật thông tin của existingOrderDetail dựa trên orderDetail

                // Thực hiện cập nhật
                return orderDetailRepository.save(existingOrderDetail);
            }
        }
        return null;
    }

    @Override
    public boolean deleteOrderDetail(long id) {
        if (id > 1) {
            OrderDetail orderDetail = orderDetailRepository.getOne(id);
            if (orderDetail != null) {
                orderDetailRepository.delete(orderDetail);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    @Override
    public OrderDetail getOneOrderDetail(long id) {
        return orderDetailRepository.getOne(id);
    }
}
