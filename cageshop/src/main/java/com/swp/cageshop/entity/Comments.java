package com.swp.cageshop.entity;


import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Comments")
@Data
public class Comments {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String title;


  @Column(columnDefinition = "LONGTEXT", nullable = false)
  private String content;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "comment_date", nullable = false)
  private Date date;

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


