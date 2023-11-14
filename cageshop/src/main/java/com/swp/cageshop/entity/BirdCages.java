package com.swp.cageshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "BirdCages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BirdCages{
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


    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "product_id")
   private Products product;


}
