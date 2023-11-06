package com.swp.cageshop.DTO;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO extends DTOBase {
    private double price;
    public String paymentCode;
    public String status;
    public Long orderId;
}
