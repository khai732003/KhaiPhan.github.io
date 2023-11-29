package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.*;
import com.swp.cageshop.config.Config;
import com.swp.cageshop.entity.*;
import com.swp.cageshop.repository.*;
import com.swp.cageshop.service.ordersService.IOrdersService;
import com.swp.cageshop.service.payService.PaysService;
import com.swp.cageshop.service.productsService.IProductsService;
import jakarta.servlet.http.HttpServletResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import jakarta.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.time.LocalDate;
import java.time.Year;
import java.time.YearMonth;
import java.util.*;

import org.springframework.web.client.RestTemplate;

@RequestMapping("/cageshop/api")
@RestController
@CrossOrigin
public class PayController {
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

    @Autowired
    private IProductsService productsService;

    @Autowired
    private PaysService paysService;

    @Autowired
    private IOrdersService iOrdersService;


    @Autowired
    private VoucherUsageRepository voucherUsageRepository;

    private VnPayDTO storedVnPayDTO;

    @Autowired
    private VouchersRepository voucherRepository;

    @PostMapping("/pay")
    public ResponseEntity<PayResponseDTO> pay(@RequestBody VnPayDTO vnPayDTO, HttpServletRequest request) {
        try {
            Orders orders = ordersRepository.getReferenceById(vnPayDTO.orderId);
            if (orders == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            String paymentResult = payService.payWithVNPAY(vnPayDTO, request);
            if(paymentResult != null) {
                PayResponseDTO paymentResponseDTO = new PayResponseDTO();
                paymentResponseDTO.setUrl(paymentResult);
                storedVnPayDTO = vnPayDTO;
                return ResponseEntity.ok(paymentResponseDTO);
            }else{
                return null;
            }
        } catch (UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // String responseCode, = 00
    @GetMapping("/xulithanhtoan")
    public void transaction(
            @RequestParam(value = "vnp_ResponseCode") String responseCode,
            @RequestParam(value = "vnp_TxnRef") String txnRef,
        HttpServletResponse response
    ) {
        if (txnRef != null && !txnRef.isEmpty() && storedVnPayDTO.getPaymentCode() != null && !storedVnPayDTO.getPaymentCode().isEmpty()) {
        if (txnRef.equals(storedVnPayDTO.getPaymentCode())) {
            if ("00".equals(responseCode)) {
                VNPayPayment vnPayEntity = modelMapper.map(storedVnPayDTO, VNPayPayment.class);
                paysRepository.save(vnPayEntity);
                Pays pays = paysRepository.findByPaymentCode(txnRef);
                if (pays != null) {
                    pays.setStatus("COMPLETED");
                    paysRepository.save(pays);
                    Orders orders = ordersRepository.getReferenceById(pays.getOrder().getId());
                    orders.setPayStatus("PAID");
                    ordersRepository.save(orders);
                    iOrdersService.updateOrderAndOrderDetailsAndVoucher(orders);
                    VoucherUsage vu = voucherUsageRepository.findByOrderId1(orders.getId());
                    if (vu != null) {
                        Vouchers v = voucherRepository.getReferenceById(vu.getVoucher().getId());
                        v.setQuantity(v.getQuantity() - 1);
                        voucherRepository.save(v);
                    }
                    String redirectUrl = "http://localhost:3000/paysuccess";
                    response.setStatus(HttpStatus.FOUND.value());
                    response.setHeader("Location", redirectUrl);
                }
            } else if ("24".equals(responseCode)) {
                String redirectUrl = "http://localhost:3000/";
                response.setStatus(HttpStatus.FOUND.value());
                response.setHeader("Location", redirectUrl);
            }
        }else{
            System.out.println("Sai code");
            String redirectUrl = "http://localhost:3000/error";
            response.setStatus(HttpStatus.FOUND.value());
            response.setHeader("Location", redirectUrl);
            response.setStatus(HttpStatus.NOT_FOUND.value());
        }
    }else {
            response.setStatus(HttpStatus.NOT_FOUND.value()); // Trả về mã trạng thái 404 nếu một trong hai chuỗi là null hoặc trống
        }
    }


    @GetMapping("/get-all")
    public List<VnPayDTO> getAllPayDTO() {
        List<Pays> payEntities = paysRepository.findAll();
        List<VnPayDTO> payDTOList = new ArrayList<>();

        for (Pays pays : payEntities) {
            VnPayDTO payDTO = modelMapper.map(pays, VnPayDTO.class);
            payDTOList.add(payDTO);
        }

        return payDTOList;
    }

    @GetMapping("/get-by/{userId}")
    public List<VnPayDTO> getAllPaysByUserId(@PathVariable Long userId) {
        return payService.getAllPayDTOByUserId(userId);
    }

    @GetMapping("/doanh-thu")
    public double getAllPaysWithCompletedStatus() {
        return paysService.getTotalRevenueFromCompletedPays();
    }


    @GetMapping("/doanh-thu/{date}")
    public double getTotalRevenueByDateFromCompletedPays(@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return paysService.getTotalRevenueByDateFromCompletedPays(date);
    }

    @PatchMapping("/{paysId}/updateCreateDate/{newCreateDate}")
    public ResponseEntity<String> updateCreateDate(
            @PathVariable Long paysId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date newCreateDate) {
        try {
            paysService.updateCreateDate(paysId, newCreateDate);
            return ResponseEntity.ok("Create date updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating create date.");
        }
    }

    @GetMapping("/by-date")
    public List<Map<String, Object>> getRevenueByDate() {
        return payService.getRevenueByDate();
    }


    @GetMapping("/month")
    public List<Map<String, Object>> getRevenueByMonth() {
        return payService.getRevenueByMonth();
    }

    @GetMapping("/year")
    public List<Map<String, Object>> getRevenueByYear() {
        return payService.getRevenueByYear();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @GetMapping("/check/{orderId}")
    public boolean checkPayWithOrderId(@PathVariable Long orderId){
        return payService.checkPays(orderId);
    }

}
