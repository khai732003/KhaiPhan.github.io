package com.swp.cageshop.DTO;

import com.swp.cageshop.entity.Products;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO extends DTOBase {
    private int quantity;
    private double productPrice;
    private double hirePrice;
    private double shipPrice;
    private String note;
    private Long orderId;
    private Long productId;
}
