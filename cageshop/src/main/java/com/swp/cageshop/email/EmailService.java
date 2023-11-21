package com.swp.cageshop.email;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.VoucherUsage;
import com.swp.cageshop.repository.OrderDetailsRepository;
import com.swp.cageshop.repository.OrdersRepository;
import java.util.List;
import java.util.stream.Collectors;

import com.swp.cageshop.repository.VoucherUsageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import java.text.NumberFormat;
import jakarta.mail.internet.MimeMessage;

import java.nio.file.Files;

@Service
public class EmailService {

    @Autowired
    OrdersRepository ordersRepository;

    @Autowired
    OrderDetailsRepository orderDetailsRepository;

    @Autowired
    VoucherUsageRepository voucherUsageRepository;
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
            List<Orders> orderList = ordersRepository.findAllById(orderId);
            List<VoucherUsage> voucherUsageList = voucherUsageRepository.findByOrderId(orderId);
            StringBuilder orderDetailsHtml = new StringBuilder();
            for (OrderDetail orderDetail : orderDetails) {
                String formattedTotalPriceProd = NumberFormat.getNumberInstance().format(orderDetail.getTotalOfProd());
                orderDetailsHtml.append("<tr>")
                        .append("<td><img src='").append(orderDetail.getProductImage()).append("' style='max-width: 100px; max-height: 100px;' alt='Product Image'></td>")
                        .append("<td>").append(orderDetail.getName()).append("</td>")
                        .append("<td>").append(orderDetail.getQuantity()).append("</td>")
                        .append("<td style='color: red; font-weight: bold;'>").append(formattedTotalPriceProd).append("</td>")
                        .append("</tr>");
            }
            StringBuilder order = new StringBuilder();
            for (Orders ordersList : orderList) {
                double  formattedDiscount = 0;
                String formattedTotalPrice = NumberFormat.getNumberInstance().format(ordersList.getTotal_Price());
                for(VoucherUsage voucherUsage : voucherUsageList){
                    double discount = voucherUsage.getVoucher().getVoucherAmount();
                    formattedDiscount += discount;
                }
                String formatted = NumberFormat.getNumberInstance().format(formattedDiscount);
                order.append("<tr>")
                        .append("<td style='color: red; font-weight: bold;'> -").append(formatted).append("</td>")
                        .append("<td style='color: red; font-weight: bold;'>").append(formattedTotalPrice).append("</td>")
                        .append("</tr>");
            }

            ClassPathResource resource = new ClassPathResource("form.html");
            String content = new String(Files.readAllBytes(resource.getFile().toPath()));
            content = content.replace("[[orderId]]", orders.getId().toString());
            content = content.replace("[[email]]", email);
            content = content.replace("[[orderDetails]]", orderDetailsHtml.toString());
            content = content.replace("[[order]]", order.toString());
            // Set email content and send the email
            helper.setText(content, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}