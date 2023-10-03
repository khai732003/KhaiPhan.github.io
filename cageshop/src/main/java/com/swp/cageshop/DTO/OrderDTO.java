package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO extends DTOBase{
    private String status;
    private String paymentMethod;
    private String shipAddress;
    private String shipDate;
    private double price;
    private String content;
    private Long userId;
}
