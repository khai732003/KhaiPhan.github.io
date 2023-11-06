package com.swp.cageshop.DTO;

import com.swp.cageshop.entity.Orders;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShippingDTO{
    private Long id;
    private LocalDateTime createDate;
    private LocalDateTime shippingDate;
    private String address;
    private String city;
    private String status;
    private Long orderId;
    private boolean isDeleted;
}
