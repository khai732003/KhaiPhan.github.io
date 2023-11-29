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
@Table(name="PAYPAL")
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("PAYPAL")
public class PaypalPayment extends Pays{
    @Column
    private String link;

}
