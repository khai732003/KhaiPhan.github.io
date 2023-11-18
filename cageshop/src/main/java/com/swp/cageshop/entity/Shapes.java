package com.swp.cageshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "Shapes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Shapes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String shapeName;


    @Column(nullable = false)
    private double price;


    @JsonIgnore
    @OneToMany(mappedBy = "shape", cascade = CascadeType.ALL)
    private List<BirdCages> birdcages;
}
