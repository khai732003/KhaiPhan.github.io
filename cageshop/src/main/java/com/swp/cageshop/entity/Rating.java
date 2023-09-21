package com.swp.cageshop.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Rating")
@Data
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int stars;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Products product;

}
