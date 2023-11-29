package com.swp.cageshop.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "Sizes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sizes  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sizeName;

    @Column(nullable = false)
    private int minspokes;


    @Column(nullable = false)
    private int maxspokes;


    @Column(nullable = false)
    private double price;


    @JsonIgnore
    @OneToMany(mappedBy = "size", cascade = CascadeType.ALL)
    private List<BirdCages> birdcages;

}
