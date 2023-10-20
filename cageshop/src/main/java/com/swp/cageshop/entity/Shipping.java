package com.swp.cageshop.entity;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Shipping")
public class Shipping extends EntityBase{

    @OneToOne
    @JoinColumn(name = "orderId", referencedColumnName = "id")
    private Orders order;

    private Date shippingDate;
    private String status;

}

