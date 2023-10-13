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

    @Column(nullable = false, length = 3000)
    private String description;

    @Column(nullable = false,length = 35)
    private String material;

    @Column(nullable = false,length =20)
    private String size;

    @Column(nullable = false,length = 10)
    private double price;


    @OneToOne
   private Products product;


}
