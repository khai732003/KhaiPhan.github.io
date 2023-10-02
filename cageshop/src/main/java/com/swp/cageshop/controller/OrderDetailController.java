package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.DTO.ProductDTO;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Products;
import com.swp.cageshop.repository.OrdersRepository;
import com.swp.cageshop.repository.ProductsRepository;
import com.swp.cageshop.service.orderdetailService.IOrderDetailService;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cageshop")
public class OrderDetailController {
    @Autowired
    private IOrderDetailService orderDetailService;
    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private ProductsRepository productsRepository;

    @PostMapping("/orderdetail/add")
    public ResponseEntity<?> addOrderDetailDTO(@RequestBody OrderDetailDTO orderDetailDTO) {
        Long orderID = orderDetailDTO.getOrderID();
        Long productID = orderDetailDTO.getProductID();
        Optional<Orders> order = ordersRepository.findById(orderID);
        Optional<Products> product = productsRepository.findById(productID);
        if (!order.isPresent() || !product.isPresent()) {
            return ResponseEntity.badRequest().body("orderID hoặc productID không tồn tại trong cơ sở dữ liệu");
        }
        OrderDetailDTO savedOrderDetailDTO = orderDetailService.addOrderDetailDTO(orderDetailDTO);
        if (savedOrderDetailDTO != null) {
            return ResponseEntity.ok(savedOrderDetailDTO);
        } else {
            return ResponseEntity.badRequest().body("Add thất bại");
        }
    }



    @PutMapping("/orderdetail/update/{orderDetailId}")
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






    @GetMapping("/orderdetail/list")
    public List<OrderDetailDTO> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetailDTOs();
    }

    public class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        // Getter và setter
    }

}
