package com.swp.cageshop.DTO;

import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BirdCageDTO   {

    private Long id;

    private String description;
    private String material;
    private String size;
    private double price;



    private Long productId;

}
