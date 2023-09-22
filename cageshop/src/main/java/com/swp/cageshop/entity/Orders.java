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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Table(name = "Orders")
@Data
public class Orders {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "order_date")
  private Date orderDate;

  // Mối quan hệ ManyToOne với User
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private Users user;

  // Mối quan hệ OneToMany với OrderDetail
  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private List<OrderDetail> orderDetails;

  // Mối quan hệ One-to-One với Cart
  @OneToOne
  @JoinColumn(name = "cart_id", unique = true, nullable = false)
  private Carts cart;

  @OneToOne(mappedBy = "order")
  private HistoryOrders historyOrder;
<<<<<<< HEAD
}
=======



  }
>>>>>>> 1445a67b85297b2cfe30d6e0d97fff9d8ca688ef
