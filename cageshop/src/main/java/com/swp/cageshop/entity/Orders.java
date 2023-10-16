package com.swp.cageshop.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Orders extends EntityBase{

  @Column
  private String status;

  @Column
  private String paymentMethod;

  @Column
  private String shipAddress;

  @Column(nullable = false,name="shipPrice")
  private double shipPrice;

  @Column
  private String content;

  @Column
  @Temporal(TemporalType.TIMESTAMP)
  private String shipDate;

  @Column(name="total_Price")
  private double total_Price;


  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private List<Vouchers> vouchers;

  @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
  private Feedbacks feedbacks;

  @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
  private Pays pays;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private List<OrderDetail> orderDetails;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private Users user;


}


