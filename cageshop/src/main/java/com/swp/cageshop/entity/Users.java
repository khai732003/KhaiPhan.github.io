package com.swp.cageshop.entity;

import jakarta.persistence.FetchType;
import jakarta.persistence.Transient;
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

  // N:1 with Role
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "role_id")
  private Roles role;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
  private List<Vouchers> vouchers;


  // 1:N voi Feedback
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
  private List<Comments> comments;

<<<<<<< HEAD

=======
>>>>>>> 41d88712177ff5d68a79e7e142f6426dfdab4c68
  // 1:N voi Feedback
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Feedbacks> feedbacks;

<<<<<<< HEAD
  // Mối quan hệ OneToMany với Order

  // Mối quan hệ OneToMany với Order`

=======
>>>>>>> 41d88712177ff5d68a79e7e142f6426dfdab4c68
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Orders> orders;

}