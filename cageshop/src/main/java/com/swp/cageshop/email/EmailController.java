package com.swp.cageshop.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/confirmOrder")
    public String confirmOrder(@RequestParam String email, @RequestParam String orderId) {
        String subject = "coạcfwfwfdfssdffsđsfsg";
        String body = "Đơn hàng của bạn với mã " + orderId + " đã được xác nhận.";
        emailService.sendEmail(email, subject, body, orderId);
        return "confirmationPage";
    }
}

