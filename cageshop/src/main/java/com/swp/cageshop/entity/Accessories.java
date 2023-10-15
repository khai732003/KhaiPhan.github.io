package com.swp.cageshop.entity;

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

    @Column(nullable = false, length = 3000)
    private String description;

    @Column(nullable = false,length = 35)
    private String type;

    @Column(nullable = false)
    private double price;



    @ManyToOne
    @JoinColumn(name = "product_id")
    private Products product;


}
