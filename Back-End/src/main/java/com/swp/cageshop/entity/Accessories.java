package com.swp.cageshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Accessories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Accessories {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private double price;

    @Column(nullable = true)
    private Boolean CustomProduct;



    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Products product;


}
