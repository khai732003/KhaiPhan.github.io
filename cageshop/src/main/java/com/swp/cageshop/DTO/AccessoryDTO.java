package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccessoryDTO {

    private Long id;
    private String description;

    private double price;
    private String type;

    private Long productId;;
}
