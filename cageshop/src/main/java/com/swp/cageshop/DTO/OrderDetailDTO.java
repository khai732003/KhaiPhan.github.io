package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO extends DTOBase {

    private int quantity;

    private double totalOfProd;

    private double hirePrice;

    private double totalCost;

    private String note;

    private Long orderId;

    private Long productId;


}
