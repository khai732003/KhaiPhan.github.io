package com.swp.cageshop.entity;


import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Comments")
@Data
public class Comments extends EntityBase{


  @Column(nullable = false, length = 100)
  private String title;


  @Column(columnDefinition = "LONGTEXT", nullable = false)
  private String content;


  // N:1 voi user
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private Users user;

  // N:1 voi product
  @ManyToOne
  @JoinColumn(name = "product_id", nullable = true)
  private Products product;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "marketing_id", nullable = true)
  private Marketings marketing;
}


