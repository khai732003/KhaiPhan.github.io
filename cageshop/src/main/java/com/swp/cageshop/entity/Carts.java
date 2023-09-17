package com.swp.cageshop.entity;

import java.util.Date;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Table(name = "Carts")
@Data
public class Carts {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_time")
  private Date createdTime;

  // Mối quan hệ One-to-One với User
  @OneToOne
  @JoinColumn(name = "user_id", unique = true, nullable = false)
  private Users user;

  // Mối quan hệ Many-to-Many với Product
  @ManyToMany
  @JoinTable(
      name = "cart_product",
      joinColumns = @JoinColumn(name = "cart_id"),
      inverseJoinColumns = @JoinColumn(name = "product_id")
  )
  private List<Products> products;

  // Mối quan hệ One-to-One với Order
  @OneToOne(mappedBy = "cart", cascade = CascadeType.ALL)
  private Orders order;
}
