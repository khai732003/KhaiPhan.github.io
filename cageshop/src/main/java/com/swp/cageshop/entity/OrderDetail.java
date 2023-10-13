package com.swp.cageshop.entity;


import com.swp.cageshop.DTO.DTOBase;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "Order_detail")
@Data
public class OrderDetail extends EntityBase {

  @Column(nullable = false)
  private int quantity;
  @Column(nullable = false)
  private double productPrice;
  @Column(nullable = false)
  private double hirePrice;
  @Column(nullable = false)
  private double shipPrice;
  @Column(nullable = false)
  private String note;

  // Mối quan hệ ManyToOne với Order
  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  private Orders order;

  // One-to-One với Product
  @OneToOne
  @JoinColumn(name="product_id")
  private Products product;

}

