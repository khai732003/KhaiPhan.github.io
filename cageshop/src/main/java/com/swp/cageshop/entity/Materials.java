package com.swp.cageshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "Materials")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Materials{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String materialName;

    @Column(nullable = false)
    private double price;

    @JsonIgnore
    @OneToMany(mappedBy = "material", cascade = CascadeType.ALL)
    private List<BirdCages> birdcages;

}