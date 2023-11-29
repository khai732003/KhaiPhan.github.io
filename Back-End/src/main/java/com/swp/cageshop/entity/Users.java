package com.swp.cageshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Users extends EntityBase{

  @Column(unique = true, nullable = false)
  private String email;

  @Column(unique = true, nullable = false)
  private String name;

  @Column(nullable = false)
  private String fullname;

  @Column(nullable = false)
  private String gender;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String image;

  @Column(unique = true, nullable = false, length = 10)
  private String phone;

  @Column(nullable = false)
  private String address;

  // N:1 with Role
  @ManyToOne(fetch = FetchType.EAGER, optional = false)
  @JoinColumn(name = "role_id")
  private Roles role;



//  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "manager_id")
  private Users manager;

  @Column
  private int shipCount;

  @Column
  private boolean shipStatus;

  @JsonIgnore
  @OneToMany(mappedBy="user")
  private List<VoucherUsage> voucherUsages;


//  //1:N voi Marketing
//  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
//  private List<Marketings> marketings;


  @JsonIgnore
  // 1:N voi Feedback
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
  private List<Comments> comments;

  @JsonIgnore
  // 1:N voi Feedback
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Feedback> feedback;

  @JsonIgnore
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Orders> orders;

  @JsonIgnore
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Shipping> shippings;

  @PrePersist
  public void prePersist() {
    this.shipStatus = false;
  }
}