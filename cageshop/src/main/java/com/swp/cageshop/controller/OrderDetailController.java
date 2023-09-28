package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.OrderDetailDTO;
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
    public OrderDetailDTO addOrderDetailDTO(@RequestBody OrderDetailDTO orderDetailDTO) {
        return orderDetailService.addOrderDetailDTO(orderDetailDTO);
    }


    @GetMapping("/orderdetail/list")
    public List<OrderDetailDTO> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetailDTOs();
    }
}
