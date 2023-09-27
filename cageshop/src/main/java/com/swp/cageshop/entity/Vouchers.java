package com.swp.cageshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Vouchers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vouchers {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String code;

  @Column(nullable = false)
  private double discountAmount;

  @Column(nullable = false)
  private boolean isActive;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private Users user;

  @ManyToOne
  @JoinColumn(name = "order_id")
  private Orders order;
}
