package com.swp.cageshop.entity;

import jakarta.persistence.OneToOne;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Users")
@Data
public class Users {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false, length = 10)
  private String phone;

  @Column(nullable = false)
  private String address;

  //N:1 voi Role
  @ManyToOne
  @JoinColumn(name = "role_id")
  private Roles role;

  //1:N voi Marketing
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Marketings> marketings;

  //1:N voi Product
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Products> products;

  // 1:N voi Feedback
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Feedbacks> feedbacks;

  // Mối quan hệ OneToMany với Order
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Orders> orders;

}
