package com.swp.cageshop.entity;


import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.transaction.Status;
import jdk.jshell.Snippet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Table(name = "Pays")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "PAY_TYPE")
public abstract class Pays{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @Column
    private double price;

    @Column(unique = true)
    private String paymentCode;

    @Column
    private String status;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Orders order;


    @PrePersist
    public void Status(){
        this.status = "CREATED";
    }
    public void prePersist() {
        this.createDate = new Date();
    }


}