package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.*;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import jakarta.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

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

    @PostMapping("/pay")
    public ResponseEntity<PayResponseDTO> pay(@RequestBody PayDTO payDTO, HttpServletRequest request) {
        try {
            Long orderId = payDTO.getOrderId();
            Optional<Orders> orderOptional = ordersRepository.findById(orderId);
            if (!orderOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            String paymentResult = payService.payWithVNPAY(payDTO, request);

            // Tạo đối tượng PaymentResponseDTO và thiết lập giá trị URL
            PayResponseDTO paymentResponseDTO = new PayResponseDTO();
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
    public ResponseEntity<?> transaction(
            @RequestParam(value = "vnp_Amount") Long amount,
            @RequestParam(value = "vnp_BankCode") String bankCode,
            @RequestParam(value = "vnp_ResponseCode") String responseCode,
            @RequestParam(value = "vnp_TxnRef") String txnRef
    ) {
        TransactionDTO transactionDTO = new TransactionDTO();

        if ("00".equals(responseCode)) {
            Pays pays = paysRepository.findByVnp_TxnRef(txnRef);
            if (pays != null) {
                pays.setStatus("Success");
                paysRepository.save(pays);
                if (pays.getOrder() != null) {
                    Orders order = pays.getOrder();
                    order.setStatus("Success");
                    ordersRepository.save(order);
                }
                transactionDTO.setStatus("OK");
                transactionDTO.setMessage("Success");
                transactionDTO.setData("");
            }
        } else {
            transactionDTO.setStatus("No");
            transactionDTO.setMessage("Fail");
            transactionDTO.setData("");


        }
        return ResponseEntity.status(HttpStatus.OK).body(transactionDTO);
    }
}
