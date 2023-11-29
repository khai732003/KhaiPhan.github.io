package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaterialDTO {

    private Long id;
    private String materialName;
    private double price;

    // Constructors, getters, setters, etc.
}