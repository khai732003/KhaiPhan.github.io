package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SizeDTO {

    private Long id;
    private String sizeName;
    private double price;
    private int minspokes;
    private int maxspokes;





}