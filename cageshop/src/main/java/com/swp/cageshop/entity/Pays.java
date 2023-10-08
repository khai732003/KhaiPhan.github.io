package com.swp.cageshop.entity;


import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@Table(name = "Pays")
@AllArgsConstructor
@NoArgsConstructor
public class Pays extends EntityBase{
    @Column(nullable = false)
    public double vnp_Ammount;

    @Column(nullable = false)
    public String vnp_OrderInfo;

    @Column(nullable = false)
    public String vnp_OrderType = "200000";

    @Column(unique = true)
    private String vnp_TxnRef;


    @ManyToOne
    @JoinColumn(name = "order_id")
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user; // Thêm trường tham chiếu đến người dùng


}