package com.swp.cageshop;

import com.swp.cageshop.email.EmailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@SpringBootApplication
@Component
public class CageshopApplication {
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}


	@Autowired
	private EmailService senderService;

	private final static Logger LOGGER =  Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);
	public static void main(String[] args) {
		SpringApplication.run(CageshopApplication.class, args);
	}


	@EventListener(ApplicationReadyEvent.class)
	public void sendEmail() {
		senderService.sendEmail("nguyenatony13@gmail.com",
				"Xác nhận đơn hàng",
				"Đơn hàng của bạn đã được xác nhận.",
				"Mã Đơn hàng");
	}

}
