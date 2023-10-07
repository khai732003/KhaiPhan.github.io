package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.DTO.PayDTO;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Pays;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.OrdersRepository;
import com.swp.cageshop.repository.PaysRepository;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.service.payService.PaysService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@RequestMapping("/cageshop")
@RestController
public class PayController{
    @Autowired
    private PaysService payService;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PaysRepository paysRepository;
    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/pay")
    public ResponseEntity<String> pay(@RequestBody PayDTO payDTO, HttpServletRequest request) {
        try {
            String paymentResult = payService.payWithVNPAY(payDTO, request);
            Long userId = payDTO.getUserId();
            Long orderId = payDTO.getOrderId();
            Optional<Users> userOptional = usersRepository.findById(userId);
            Optional<Orders> orderOptional = ordersRepository.findById(orderId);
            if (!userOptional.isPresent() || !orderOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("UserId hoặc OrderId không tồn tại!");
            }
            Pays paysEntity = modelMapper.map(payDTO, Pays.class);
            paysRepository.save(paysEntity);
            return ResponseEntity.ok(paymentResult);
        } catch (UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi trong quá trình xử lý thanh toán.");
        }
    }

    @GetMapping("/payments")
    public ResponseEntity<List<PayDTO>> getAllPayments() {
        List<PayDTO> paymentList = payService.getAllPayDTO();
        if (paymentList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(paymentList);
        }
        return ResponseEntity.ok(paymentList);
    }

}