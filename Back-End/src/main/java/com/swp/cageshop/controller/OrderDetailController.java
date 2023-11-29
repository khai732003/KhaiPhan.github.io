package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.DTO.ProductDTO;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Products;
import com.swp.cageshop.repository.OrderDetailsRepository;
import com.swp.cageshop.repository.OrdersRepository;
import com.swp.cageshop.repository.ProductsRepository;
import com.swp.cageshop.service.orderdetailService.IOrderDetailService;
import com.swp.cageshop.service.ordersService.IOrdersService;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/cageshop/api/order_detail")
public class OrderDetailController {
    @Autowired
    private IOrderDetailService orderDetailService;

    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private IOrderDetailService iOrderDetailService;
    @PostMapping("/add")
    public OrderDetailDTO addOrderDetail(@RequestBody OrderDetailDTO orderDetailDTO) {

        return orderDetailService.addOrderDetail(orderDetailDTO);

    }



    @PutMapping("/update/{orderDetailId}")
    public ResponseEntity<?> updateOrderDetail(
            @PathVariable Long orderDetailId,
            @RequestParam int newQuantity,
            @RequestParam double newPrice,
            @RequestBody OrderDetailDTO updatedOrderDetailDTO) {

        try {
            OrderDetailDTO updatedOrderDetail = orderDetailService.updateOrderDetailDTO(orderDetailId, newQuantity, newPrice, updatedOrderDetailDTO);

            if (updatedOrderDetail != null) {
                return ResponseEntity.ok(updatedOrderDetail);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/list")
    public List<OrderDetailDTO> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetailDTOs();
    }

    @DeleteMapping("/{orderId}")
    public List<OrderDetailDTO> getAllOrderDetailsByOrderId(@PathVariable Long orderId) {
        return iOrderDetailService.getAllOrderDetailsByOrderId(orderId);
    }

    @PatchMapping("/delete-by/{id}")
    public ResponseEntity<String> deleteOrderDetail(@PathVariable Long id) {
        orderDetailService.deleteOrderDetail(id);
        return new ResponseEntity<>("Order detail with id " + id + " has been marked as deleted.", HttpStatus.OK);
    }

       @GetMapping("/list-all")
        public List<OrderDetail> getAll() {
        return iOrderDetailService.listAll();
        }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
