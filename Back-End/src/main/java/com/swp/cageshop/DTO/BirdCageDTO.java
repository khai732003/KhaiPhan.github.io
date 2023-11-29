package com.swp.cageshop.DTO;

import jakarta.persistence.Column;
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
    private Long shapeId;
    private Long materialId;
    private Long sizeId;
    private double birdCagePrice;
    private int spokes;
    private Long productId;


//    public double getBirdCagePrice() {
//        double totalPrice = 0;
//
//        if (material != null) {
//            totalPrice += material.getPrice();
//        }
//
//        if (size != null && spokes >= size.getMinspokes() && spokes <= size.getMaxspokes()) {
//            totalPrice +=   size.getPrice() * spokes;
//        }
//
//
//        return totalPrice;
//    }
}
