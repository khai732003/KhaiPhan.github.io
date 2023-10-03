package com.swp.cageshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "BirdCages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BirdCages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String material;

    @Column(nullable = false)
    private String size;

    @Column(nullable = false)
    private double price;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Products product;
}
