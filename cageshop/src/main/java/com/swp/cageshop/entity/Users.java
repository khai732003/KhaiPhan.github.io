package com.swp.cageshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

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
  private Integer gender;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String image;

  @Column(nullable = false, length = 10)
  private String phone;

  @Column(nullable = false)
  private String address;

//  @Column(nullable = false)
//  private String verfiCode;

  // N:1 with Role
  @ManyToOne(fetch = FetchType.EAGER, optional = false)
  @JoinColumn(name = "role_id")
  private Roles role;

  // N:1 with itself (Users ManyToOne Users)
  @ManyToOne
  @JoinColumn(name = "manager_id")
  private Users manager;


  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
  private List<Vouchers> vouchers;


  //1:N voi Marketing
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
  private List<Marketings> marketings;


  // 1:N voi Feedback
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
  private List<Comments> comments;

  // 1:N voi Feedback
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Feedbacks> feedbacks;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Orders> orders;

}