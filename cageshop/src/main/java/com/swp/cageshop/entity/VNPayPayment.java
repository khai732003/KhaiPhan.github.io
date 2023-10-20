package com.swp.cageshop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Entity
@Data
@Table(name="VNPAY")
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("VNPAY")
public class VNPayPayment extends Pays{

    @Column(nullable = true)
    public String vnp_OrderInfo;

    @Column(nullable = true)
    public String vnp_OrderType = "200000";

    @Column(nullable = true)
    private String vnp_bankCode;

}
