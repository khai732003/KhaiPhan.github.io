package com.swp.cageshop.service.payService;

import com.swp.cageshop.DTO.OrderDTO;
import com.swp.cageshop.DTO.PaymentDTO;
import com.swp.cageshop.DTO.VnPayDTO;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Pays;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface PaysServiceImpl {
    public String payWithVNPAY(VnPayDTO vnPayDTO, HttpServletRequest request) throws UnsupportedEncodingException;

    public List<VnPayDTO> getAllPayDTO();

    public List<VnPayDTO> getAllPayDTOByUserId(Long userId);


    public double getTotalRevenueFromCompletedPays();

    public double getTotalRevenueByDateFromCompletedPays(Date date);

    public boolean checkPays(Long orderId);

}
