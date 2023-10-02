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
public class Accessories extends EntityBase {

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String type;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Products product;


}
