package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO extends DTOBase{
    private int quantity;
    private double price;
    private Long orderID;
    private Long productID;
}
