package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.service.ordersService.IOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cageshop")
public class OrdersController {
    @Autowired
    private IOrdersService iOrdersService;

    @Autowired
    private UsersRepository usersRepository;
    @PostMapping("/order/add")
    public ResponseEntity<?> addOrders(@RequestBody OrderDTO orderDTO) {
       Long userID = orderDTO.getUserID();
        Optional<Users> users = usersRepository.findById(userID);
        if(!users.isPresent()){
            return ResponseEntity.badRequest().body("userID không tồn tại trong cơ sở dữ liệu");
        }
        OrderDTO savedOrderDTO = iOrdersService.addOrderDTO(orderDTO);
        if (savedOrderDTO != null) {
            return ResponseEntity.ok(savedOrderDTO);
        } else {
            return ResponseEntity.badRequest().body("Add thất bại");
        }
    }

    //API get list
    @GetMapping("/order/list")
    public List<OrderDTO> getAllOrders(){
        return iOrdersService.getAllOrderDTO();
    }
}
