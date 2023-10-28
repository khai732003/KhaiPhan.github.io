package com.swp.cageshop.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swp.cageshop.DTO.PaypalDTO;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.PaypalPayment;
import com.swp.cageshop.repository.OrdersRepository;
import com.swp.cageshop.repository.PaysRepository;
import com.swp.cageshop.repository.PaypalPaymentRepository;
import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@CrossOrigin
public class PayPalController {
    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private PaysRepository paysRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PaypalPaymentRepository paypalPaymentRepository;

    private final String BASE = "https://api-m.sandbox.paypal.com";
    private final static Logger LOGGER = Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);

    private String getAuth(String client_id, String app_secret) {
        String auth = client_id + ":" + app_secret;
        return Base64.getEncoder().encodeToString(auth.getBytes());
    }

    private String generateAccessToken() {
        String auth = this.getAuth(
            "AaWSnvt4rwX5aILA175T8zS02f1ExhM0hC0CJ8qy0dgEHDfrB7z2oP0y5k69gWD3vqXQR_oTuGhsPueL",
            "EAG_6ClVHYLK9lxvIeclJDXxbTbukOefCDYhX5Q-3E4YB6As-Ly-96YFAW5Syni0NwFiAn94t5Mi2Mvr"
        );
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Basic " + auth);

        HttpEntity<?> request = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
            BASE + "/v1/oauth2/token?grant_type=client_credentials",
            HttpMethod.POST,
            request,
            String.class
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            LOGGER.log(Level.INFO, "GET TOKEN: SUCCESSFUL!");
            return new JSONObject(response.getBody()).getString("access_token");
        } else {
            LOGGER.log(Level.SEVERE, "GET TOKEN: FAILED!");
            return "Unavailable to get ACCESS TOKEN, STATUS CODE " + response.getStatusCode();
        }
    }

    @RequestMapping(value="/api/orders/{paymentCode}/capture", method = RequestMethod.POST)
    @CrossOrigin
    public Object capturePayment(@PathVariable("paymentCode") String paymentCode) {
        String accessToken = generateAccessToken();
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();

        headers.set("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/json");
        headers.add("Accept", "application/json");
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(null, headers);

        ResponseEntity<Object> response = restTemplate.exchange(
            BASE + "/v2/checkout/orders/" + paymentCode + "/capture",
            HttpMethod.POST,
            entity,
            Object.class
        );

        if (response.getStatusCode() == HttpStatus.CREATED) {
            LOGGER.log(Level.INFO, "ORDER CREATED");
            PaypalDTO paypalDTO = new PaypalDTO();
            paypalDTO.setPaymentCode(paymentCode);
            processStatus(response.getBody().toString(), paypalDTO);
            return response.getBody();
        } else {
            LOGGER.log(Level.INFO, "FAILED CREATING ORDER");
            return "Unavailable to get CREATE AN ORDER, STATUS CODE " + response.getStatusCode();
        }
    }

    @RequestMapping(value="/api/orders", method = RequestMethod.POST)
    @CrossOrigin
    public Object createOrder(@RequestBody PaypalDTO paypalDTO) {
        String accessToken = generateAccessToken();
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/json");
        headers.add("Accept", "application/json");
        headers.setContentType(MediaType.APPLICATION_JSON);

        Orders price = ordersRepository.getReferenceById(paypalDTO.getOrderId());
        String currencyCode = "USD";
        double amountValue = price.getTotal_Price();

        String requestJson = "{\"intent\":\"CAPTURE\",\"purchase_units\":[{\"amount\":{\"currency_code\":\"" + currencyCode + "\",\"value\":\"" + amountValue + "\"}}]}";
        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);
        ResponseEntity<Object> response = restTemplate.exchange(
            BASE + "/v2/checkout/orders",
            HttpMethod.POST,
            entity,
            Object.class
        );

        if (response.getStatusCode() == HttpStatus.CREATED) {
            LOGGER.log(Level.INFO, "ORDER CAPTURE");
            processResponse(response.getBody().toString(), paypalDTO);
            return response.getBody();
        } else {
            LOGGER.log(Level.INFO, "FAILED CAPTURING ORDER");
            return "Unavailable to get CAPTURE ORDER, STATUS CODE " + response.getStatusCode();
        }
    }

    private void processResponse(String jsonStr, PaypalDTO paypalDTO) {
        int idIndex = jsonStr.indexOf("id");
        int commaIndex = jsonStr.indexOf(",", idIndex);
        if (idIndex != -1) {
            if (commaIndex == -1) {
                String idValue = jsonStr.substring(idIndex + 5).replaceAll("\"", "");
                System.out.println("ID: " + idValue);
            } else {
                String idValue = jsonStr.substring(idIndex + 5, commaIndex).replaceAll("\"", "");
                System.out.println("ID: " + idValue);
                PaypalPayment paypalPayment = modelMapper.map(paypalDTO, PaypalPayment.class);
                paypalPayment.setPaymentCode(idValue);
                paysRepository.save(paypalPayment);
            }
        } else {
            System.out.println("Không tìm thấy giá trị ID trong chuỗi.");
        }
    }

    private void processStatus(String jsonStr, PaypalDTO paypalDTO) {
        int statusIndex = jsonStr.indexOf("status");
        int commaIndex = jsonStr.indexOf(",", statusIndex);
        if (statusIndex != -1) {
            if (commaIndex == -1) {
                String statusValue = jsonStr.substring(statusIndex + 8).replaceAll("\"", "");
                System.out.println("Status: " + statusValue);
            } else {
                String statusValue = jsonStr.substring(statusIndex + 8, commaIndex).replaceAll("\"", "");
                System.out.println("Status: " + statusValue);
                PaypalPayment paypalPayment = paysRepository.findPaypalPaymentByPaymentCode(paypalDTO.getPaymentCode());
                paypalPayment.setStatus(statusValue);
                paysRepository.save(paypalPayment);
            }
        }
    }
}
