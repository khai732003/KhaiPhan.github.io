package com.swp.cageshop.entity;


import com.swp.cageshop.DTO.DTOBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Order_detail")
@Data
public class OrderDetail extends EntityBase {


  private int quantity;

  private double price;

  // Mối quan hệ ManyToOne với Order
  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  private Orders order;

  // One-to-One với Product
  @OneToOne
  @JoinColumn(name = "product_id", referencedColumnName = "id")
  private Products products;
}

