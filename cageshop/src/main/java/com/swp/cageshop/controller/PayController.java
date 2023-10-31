package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.*;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.Pays;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.OrdersRepository;
import com.swp.cageshop.repository.PaysRepository;
import com.swp.cageshop.repository.ProductsRepository;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.service.payService.PaysService;
import com.swp.cageshop.service.productsService.IProductsService;
import jakarta.servlet.http.HttpServletResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import jakarta.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    @PostMapping("/pay")
    public ResponseEntity<PayResponseDTO> pay(@RequestBody VnPayDTO vnPayDTO, HttpServletRequest request) {
        try {
            Long orderId = vnPayDTO.getOrderId();
            Optional<Orders> orderOptional = ordersRepository.findById(orderId);
            if (!orderOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            String paymentResult = payService.payWithVNPAY(vnPayDTO, request);

            // Tạo đối tượng PaymentResponseDTO và thiết lập giá trị URL
            PayResponseDTO paymentResponseDTO = new PayResponseDTO();
            paymentResponseDTO.setStatus("Sucess");
            paymentResponseDTO.setMessage("Ok");
            paymentResponseDTO.setUrl(paymentResult);

            // Trả về ResponseEntity với đối tượng PaymentResponseDTO và HTTP status OK
            return ResponseEntity.ok(paymentResponseDTO);
        } catch (UnsupportedEncodingException e) {
            // Xử lý ngoại lệ và trả về lỗi 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


//    @GetMapping("/payments")
//    public ResponseEntity<List<PayDTO>> getAllPayments() {
//        List<PayDTO> paymentList = payService.getAllPayDTO();
//        if (paymentList.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(paymentList);
//        }
//        return ResponseEntity.ok(paymentList);
//    }

    // String responseCode, = 00
    @GetMapping("/payment_infor")
    public void transaction(
            @RequestParam(value = "vnp_Amount") Long amount,
            @RequestParam(value = "vnp_BankCode") String bankCode,
            @RequestParam(value = "vnp_ResponseCode") String responseCode,
            @RequestParam(value = "vnp_TxnRef") String txnRef,
        HttpServletResponse response

    ) {
        TransactionDTO transactionDTO = new TransactionDTO();

        if ("00".equals(responseCode)) {
            Pays pays = paysRepository.findByPaymentCode(txnRef);
            if (pays != null) {
                pays.setStatus("COMPLETED");
                paysRepository.save(pays);
                    transactionDTO.setStatus("OK");
                    transactionDTO.setMessage("Success");
                    transactionDTO.setData("");
                Orders orders = ordersRepository.getReferenceById(pays.getOrder().getId());
                orders.setPayStatus("PAID");
                ordersRepository.save(orders);
                // Chuyển hướng request nếu responseCode là "00"
                String redirectUrl = "http://localhost:3000/paysuccess"; // Địa chỉ bạn muốn chuyển hướng đến
                response.setStatus(HttpStatus.FOUND.value());
                response.setHeader("Location", redirectUrl);
                }
        } else {
            transactionDTO.setStatus("No");
            transactionDTO.setMessage("Fail");
            transactionDTO.setData("");
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

}
