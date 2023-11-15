package com.swp.cageshop.email;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.repository.OrderDetailsRepository;
import com.swp.cageshop.repository.OrdersRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

import java.nio.file.Files;

@Service
public class EmailService {

    @Autowired
    OrdersRepository ordersRepository;

    @Autowired
    OrderDetailsRepository orderDetailsRepository;
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String subject, Long orderId, String email) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("9.10nguyenhuubao@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject(subject);
            Orders orders = ordersRepository.getReferenceById(orderId);
            List<OrderDetail> orderDetails = orderDetailsRepository.findAllByOrderId(orderId);

            // Generate table rows for order details
            StringBuilder orderDetailsHtml = new StringBuilder();
            for (OrderDetail orderDetail : orderDetails) {
                orderDetailsHtml.append("<tr>")
                        .append("<td><img src='").append(orderDetail.getProductImage()).append("' style='max-width: 100px; max-height: 100px;' alt='Product Image'></td>")
                        .append("<td>").append(orderDetail.getName()).append("</td>")
                        .append("<td>").append(orderDetail.getQuantity()).append("</td>")
                        .append("<td>").append(orderDetail.getTotalCost()).append("</td>")
                        .append("</tr>");
            }


            // Read content from the HTML file and replace placeholders
            ClassPathResource resource = new ClassPathResource("form.html");
            String content = new String(Files.readAllBytes(resource.getFile().toPath()));
            content = content.replace("[[orderId]]", orders.getId().toString());
            content = content.replace("[[email]]", email);
            content = content.replace("[[orderDetails]]", orderDetailsHtml.toString());

            // Set email content and send the email
            helper.setText(content, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}