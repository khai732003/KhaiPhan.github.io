package com.swp.cageshop.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Shipping")
public class Shipping extends EntityBase{

    @Column(nullable = false)
    private Date shippingDate;

    @Column(nullable = false)
    private String status;

    @OneToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Orders order;

}
