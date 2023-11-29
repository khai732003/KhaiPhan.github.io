package com.swp.cageshop.DTO;

import com.swp.cageshop.entity.OrderDetail;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO extends DTOBase{
    private String name;
    private String shipStatus;
    private String payStatus;
    private String paymentMethod;
    private String address;
    private String city;
    private String content;
    private String shipDate;
    private double total_price;
    private List<OrderDetailDTO> orderDetails;
    private Long userId;
    private Double discount;
}
