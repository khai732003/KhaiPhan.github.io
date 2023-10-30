package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.service.ordersService.IOrdersService;
import com.swp.cageshop.service.ordersService.OrdersServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/cageshop/api/order")
public class OrdersController {
    @Autowired
    private IOrdersService iOrdersService;

    @Autowired
    private OrdersServiceImpl ordersService;
    @Autowired
    private UsersRepository usersRepository;
    @PostMapping("/add")
    public ResponseEntity<?> addOrders(@RequestBody OrderDTO orderDTO) {
        Long userId = orderDTO.getUserId();
        Optional<Users> users = usersRepository.findById(userId);
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
    @GetMapping("/list")
    public List<OrderDTO> getAllOrders(){
        return iOrdersService.getAllOrderDTO();
    }

    @GetMapping("/list/{id}")
    public OrderDTO findOrderById(@PathVariable Long id) {
        return iOrdersService.findById(id);
    }

    @GetMapping("/list-all/paid")
    public List<OrderDTO> getPaidOrders() {
        return ordersService.getPaidOrders();
    }

    @GetMapping("/list-by-status/{shipStatus}")
    public List<OrderDTO> getOrdersByShipStatus(@PathVariable String shipStatus) {
        return ordersService.getOrdersByShipStatus(shipStatus);
    }

    @GetMapping("/payStatus/{status}")
    public List<String> getAllPayStatusByStatus(@PathVariable String status) {
        return ordersService.getAllPayStatusByStatus(status);
    }

    @GetMapping("/shipStatus/{status}")
    public List<String> getAllShipStatusByStatus(@PathVariable String status) {
        return ordersService.getAllShipStatusByStatus(status);
    }

    @GetMapping("/list-by-user/{userId}")
    public List<OrderDTO> getOrdersByUserId(@PathVariable Long userId) {
        return iOrdersService.getOrdersByUserId(userId);
    }


    @GetMapping("/list-by-user-and-pay-status/{userId}/{payStatus}")
    public List<OrderDTO> getOrdersByUserIdAndPayStatus(@PathVariable Long userId, @PathVariable String payStatus) {
        return iOrdersService.getOrdersByUserIdAndPayStatus(userId, payStatus);
    }
}
