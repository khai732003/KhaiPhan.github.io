package com.swp.cageshop.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Orders extends EntityBase{


  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private Users user;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private List<OrderDetail> orderDetails;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private List<Vouchers> vouchers;

}


