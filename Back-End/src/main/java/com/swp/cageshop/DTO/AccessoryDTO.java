package com.swp.cageshop.DTO;

import jakarta.persistence.Transient;
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
    private Boolean customProduct;

    private Long productId;;
}
