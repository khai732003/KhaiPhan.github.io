package com.swp.cageshop.service.payService;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.PaymentDTO;
import com.swp.cageshop.DTO.VnPayDTO;
import com.swp.cageshop.entity.Orders;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public interface PaysServiceImpl {
    public String payWithVNPAY(VnPayDTO vnPayDTO, HttpServletRequest request) throws UnsupportedEncodingException;

    public List<VnPayDTO> getAllPayDTO();

    public List<VnPayDTO> getAllPayDTOByUserId(Long userId);

//    String createAccessToken();
//
//    ResponseEntity<Object> createOrder(PayDTO payDTO);
//
//    void processResponse(String response);

}
