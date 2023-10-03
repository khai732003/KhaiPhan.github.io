package com.swp.cageshop.service.payService;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.PayDTO;
import com.swp.cageshop.entity.Orders;
import jakarta.servlet.http.HttpServletRequest;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public interface PaysServiceImpl {
    public String payWithVNPAY(PayDTO payDTO, HttpServletRequest request) throws UnsupportedEncodingException;
    public List<PayDTO> getAllPayDTO();

}
