package com.swp.cageshop;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@SpringBootApplication
@Component
public class CageshopApplication {
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	private final static Logger LOGGER =  Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);
	public static void main(String[] args) {
		SpringApplication.run(CageshopApplication.class, args);
	}

}
