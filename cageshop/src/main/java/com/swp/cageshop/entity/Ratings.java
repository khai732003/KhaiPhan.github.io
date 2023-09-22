package com.swp.cageshop.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Ratings")
@Data
public class Ratings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int score;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Products product;

}
