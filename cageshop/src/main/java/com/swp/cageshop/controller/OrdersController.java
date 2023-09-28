package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.service.ordersService.IOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cageshop")
public class OrdersController {
    @Autowired
    private IOrdersService iOrdersService;

    @PostMapping("/order/add")
    public OrderDTO addOrders(@RequestBody OrderDTO orderDTO){
        return iOrdersService.addOrderDTO(orderDTO);
    }

    //API get list
    @GetMapping("/order/list")
    public List<OrderDTO> getAllOrders(){
        return iOrdersService.getAllOrderDTO();
    }
}
