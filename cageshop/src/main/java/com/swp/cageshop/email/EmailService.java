package com.swp.cageshop.email;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swp.cageshop.DTO.OrderDetailDTO;
import com.swp.cageshop.entity.OrderDetail;
import com.swp.cageshop.entity.Orders;
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
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String subject, String orderId, String email) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("9.10nguyenhuubao@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject(subject);
            Long id = Long.parseLong(orderId);
            Orders orders = ordersRepository.getReferenceById(id);
            List<OrderDetail> orderDetails = orders.getOrderDetails();
            List<OrderDetailDTO> orderDetailsDTO = orderDetails.stream()
                .map(orderDetail -> {
                    OrderDetailDTO dto = new OrderDetailDTO();
                    dto.setQuantity(orderDetail.getQuantity());
                    dto.setName(orderDetail.getName());
                    dto.setTotalCost(orderDetail.getTotalCost());
                    // Thêm các trường khác cần thiết
                    return dto;
                })
                .collect(Collectors.toList());

            ObjectMapper objectMapper = new ObjectMapper();
            String orderDetailsJson = objectMapper.writeValueAsString(orderDetailsDTO);





            ClassPathResource resource = new ClassPathResource("form.html");
            String content = new String(Files.readAllBytes(resource.getFile().toPath()));

            // Thay thế placeholder trong template HTML bằng chuỗi JSON của orderDetailsDTO
            content = content.replace("[[orderDetails]]", orderDetailsJson);
            // Thay thế các placeholder trong template HTML bằng giá trị thực từ orderId và email
            content = content.replace("[[orderId]]", orderId);
            content = content.replace("[[email]]", email);

            helper.setText(content, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}