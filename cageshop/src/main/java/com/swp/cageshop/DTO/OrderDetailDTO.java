package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO extends DTOBase {

    private int quantity;

    private double hirePrice;

    private String note;

    private Long orderId;

    private Long productId;

}
