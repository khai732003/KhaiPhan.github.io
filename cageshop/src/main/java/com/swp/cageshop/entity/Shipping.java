package com.swp.cageshop.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Shipping")
public class Shipping extends EntityBase{

    @Column(nullable = true)
    private Date shippingDate;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String status;

    @OneToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Orders order;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

}

