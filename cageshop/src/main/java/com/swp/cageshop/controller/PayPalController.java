package com.swp.cageshop.controller;


import com.swp.cageshop.DTO.PaypalDTO;
import com.swp.cageshop.DTO.VnPayDTO;
import com.swp.cageshop.entity.Orders;
import com.swp.cageshop.entity.PaypalPayment;
import com.swp.cageshop.entity.Pays;
import com.swp.cageshop.repository.OrdersRepository;
import com.swp.cageshop.repository.PaypalPaymentRepository;
import com.swp.cageshop.repository.PaysRepository;
import com.swp.cageshop.repository.VNPayPaymentRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
public class PayPalController {
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private PaysRepository paysRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PaypalPaymentRepository paypalPaymentRepository;

    private final String  BASE = "https://api-m.sandbox.paypal.com";
    private final static Logger LOGGER =  Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);

    public static String file = "C:/Users/ADMIN-PC/Desktop/response.txt";

    private String getAuth(String client_id, String app_secret) {
        String auth = client_id + ":" + app_secret;
        return Base64.getEncoder().encodeToString(auth.getBytes());
    }

    public String generateAccessToken() {
        String auth = this.getAuth(
                "AaWSnvt4rwX5aILA175T8zS02f1ExhM0hC0CJ8qy0dgEHDfrB7z2oP0y5k69gWD3vqXQR_oTuGhsPueL",
                "EAG_6ClVHYLK9lxvIeclJDXxbTbukOefCDYhX5Q-3E4YB6As-Ly-96YFAW5Syni0NwFiAn94t5Mi2Mvr"
        );
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Basic " + auth);

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        HttpEntity<?> request = new HttpEntity<>(requestBody, headers);
        requestBody.add("grant_type", "client_credentials");

        ResponseEntity<String> response = restTemplate.postForEntity(
                BASE +"/v1/oauth2/token",
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

        HttpEntity<String> entity = new HttpEntity<String>(null, headers);

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
    public Object createOrder(@RequestBody PaypalDTO paypalDTO) throws IOException {
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
        HttpEntity<String> entity = new HttpEntity<String>(requestJson, headers);
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
        int idIndex = jsonStr.indexOf("id=");
        int commaIndex = jsonStr.indexOf(",", idIndex);
        int statusIndex = jsonStr.indexOf("status=");
        int commaIndexStatus = jsonStr.indexOf(",", statusIndex);

        if (idIndex != -1) {
            if (commaIndex == -1) {
                String idValue = jsonStr.substring(idIndex + 3);
                System.out.println("ID: " + idValue);
            } else {
                Long orderId = paypalDTO.getOrderId();
                Orders orderOptional = ordersRepository.getReferenceById(orderId);
                if (orderOptional != null) {
                    String idValue = jsonStr.substring(idIndex + 3, commaIndex);
                    System.out.println("ID: " + idValue);
                    PaypalPayment paypalPayment = modelMapper.map(paypalDTO, PaypalPayment.class);
                    paypalPayment.setPaymentCode(idValue);

                    if (statusIndex != -1) {
                        if (commaIndexStatus == -1) {
                            String statusValue = jsonStr.substring(statusIndex + 7);
                            System.out.println("Status: " + statusValue);
                        } else {
                            String statusValue = jsonStr.substring(statusIndex + 7, commaIndexStatus);
                            System.out.println("Status: " + statusValue);
                            paypalPayment.setStatus(statusValue);
                            paypalPayment.setPrice(orderOptional.getTotal_Price());
                        }
                    }
                    paysRepository.save(paypalPayment);
                } else {
                    System.out.println("OrderId không tồn tại trong cơ sở dữ liệu.");
                }
            }
        } else {
            System.out.println("Không tìm thấy giá trị ID trong chuỗi.");
        }
    }


    private void processId(String jsonStr, PaypalDTO paypalDTO) {
        int idIndex = jsonStr.indexOf("id=");
        int commaIndex = jsonStr.indexOf(",", idIndex);
        if (idIndex != -1) {
            if (commaIndex == -1) {
                String idValue = jsonStr.substring(idIndex + 3);
                System.out.println("ID: " + idValue);
            } else {
                Long orderId = paypalDTO.getOrderId();
                Orders orderOptional = ordersRepository.getReferenceById(orderId);
                if (orderOptional!=null) {
                    String idValue = jsonStr.substring(idIndex + 3, commaIndex);
                    System.out.println("ID: " + idValue);
                    PaypalPayment paypalPayment = modelMapper.map(paypalDTO, PaypalPayment.class);
                    paypalPayment.setPaymentCode(idValue);
                    paysRepository.save(paypalPayment);
                } else {
                    System.out.println("OrderId không tồn tại trong cơ sở dữ liệu.");
                }
            }
        } else {
            System.out.println("Không tìm thấy giá trị ID trong chuỗi.");
        }
    }


    private void processStatus(String jsonStr, PaypalDTO paypalDTO) {
        int statusIndex = jsonStr.indexOf("status=");
        int commaIndex = jsonStr.indexOf(",", statusIndex);
        if (statusIndex != -1) {
            if (commaIndex == -1) {
                String statusValue = jsonStr.substring(statusIndex + 7);
                System.out.println("Status: " + statusValue);
            } else {
                String statusValue = jsonStr.substring(statusIndex + 7, commaIndex);
                System.out.println("Status: " + statusValue);
                PaypalPayment paypalPayment = paysRepository.findPaypalPaymentByPaymentCode(paypalDTO.paymentCode);
                paypalPayment.setStatus(statusValue);
                paysRepository.save(paypalPayment);

            }
        }
    }

}
