package com.swp.cageshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.Shape;

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

    @ManyToOne
    @JoinColumn(name = "shape_id", nullable = false)
    private Shapes shape;

    @ManyToOne
    @JoinColumn(name = "material_id", nullable = false)
    private Materials material;

    @ManyToOne
    @JoinColumn(name = "size_id", nullable = false)
    private Sizes size;

    @Column(nullable = false)
    private double birdCagePrice;

    @Column(nullable = false)
    private int spokes;




    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "product_id")
   private Products product;


}
