package com.swp.cageshop.controller;

import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.service.orderdetailService.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cageshop")
public class OrderDetailController {
    @Autowired
    private IOrderDetailService orderDetailService;

    @PostMapping("/orderdetail/add")
    public OrderDetail addOrderDetail(@RequestBody OrderDetail orderDetail) {
        return orderDetailService.addOrderDetail(orderDetail);
    }

    @PutMapping("/orderdetail/update")
    public OrderDetail updateOrderDetail(@RequestParam("id") long id, @RequestBody OrderDetail orderDetail) {
        return orderDetailService.updateOrderDetail(id, orderDetail);
    }

    @DeleteMapping("/orderdetail/delete/{id}")
    public boolean deleteOrderDetail(@PathVariable("id") long id) {
        return orderDetailService.deleteOrderDetail(id);
    }

    @GetMapping("/orderdetail/list")
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetails();
    }
}
