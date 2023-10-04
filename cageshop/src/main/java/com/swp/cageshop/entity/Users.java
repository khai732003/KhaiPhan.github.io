package com.swp.cageshop.entity;

import jakarta.persistence.FetchType;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;
import java.util.Date;
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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

  @Column(nullable = false)
  private String verfiCode;


  // N:1 with Role
  @ManyToOne(fetch = FetchType.EAGER, optional = false)
  @JoinColumn(name = "role_id")
  private Roles role;

  // N:1 with itself (Users OneToMany Users)
  @OneToMany(mappedBy = "depend_id", cascade = CascadeType.ALL)
  private List<Users> relatedUsers;

  // N:1 with itself (Users ManyToOne Users)
  @ManyToOne
  @JoinColumn(name = "depend_id")
  private Users depend_id;


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

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Pays> pays; // Thêm trường danh sách các giao dịch thanh toán

}