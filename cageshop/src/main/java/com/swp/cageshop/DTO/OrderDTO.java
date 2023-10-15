package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO extends DTOBase{
    private String status;
    private String paymentMethod;
    private String shipAddress;
    private String content;
    private String shipDate;
    private double price;
    private List<OrderDetailDTO> orderDetails;
    private Long userId;
}
