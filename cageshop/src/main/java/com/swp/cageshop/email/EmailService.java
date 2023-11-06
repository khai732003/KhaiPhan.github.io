package com.swp.cageshop.email;

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
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String subject, String orderId, String email) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("9.10nguyenhuubao@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject(subject);

            ClassPathResource resource = new ClassPathResource("form.html");
            String content = new String(Files.readAllBytes(resource.getFile().toPath()));
            content = content.replace("[[orderId]]", orderId);
            content = content.replace("[[email]]", email);

            helper.setText(content, true);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
