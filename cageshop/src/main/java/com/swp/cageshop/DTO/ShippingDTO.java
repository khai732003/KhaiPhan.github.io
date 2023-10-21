package com.swp.cageshop.DTO;

import com.swp.cageshop.entity.Orders;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShippingDTO extends DTOBase{
    private Date shippingDate;
    private String status;
    private Long orderId;
}
