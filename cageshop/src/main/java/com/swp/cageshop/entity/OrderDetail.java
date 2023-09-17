package com.swp.cageshop.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Order_detail")
@Data
public class OrderDetail {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int quantity;

  private double price;

  // Mối quan hệ ManyToOne với Order
  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  private Orders order;

  // N:1 voi product
  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  private Products product;
}

