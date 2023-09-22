package com.swp.cageshop.entity;


import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
  @JoinColumn(name = "product_id", nullable = false)
  private Products product;
}

