package com.swp.cageshop.controller;

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


    @GetMapping("/HIHI")
    public String test(){
        return "cc";
    }
    @PostMapping("/order/add")
    public Orders addOrders(@RequestBody Orders orders){
        return iOrdersService.addOrders(orders);
    }

    // API update Orders
    @PutMapping("/order/update")
    public Orders updateOrders(@RequestParam("id") long id, @RequestBody Orders orders){
        return iOrdersService.updateOrders(id,orders);
    }

    // API delete Orders
    @DeleteMapping("/order/delete/{id}")
    public boolean deleteOrders(@PathVariable("id") long id){
        return iOrdersService.deleteOrders(id);
    }

    //API get list
    @GetMapping("/order/list")
    public List<Orders> getAllOrders(){
        return iOrdersService.getAllOrders();
    }
}
