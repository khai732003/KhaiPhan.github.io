package com.swp.cageshop.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;

@Entity
@Table(name = "Orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Orders extends EntityBase {
  @Column
  private String name;

  @Column(nullable = false)
  private String shipStatus;

  @Column(nullable = false)
  private String payStatus;

  @Column
  private String paymentMethod;

  @Column
  private String address;

  @Column
  private String city;

  @Column
  private String content;

  @Column
  @Temporal(TemporalType.TIMESTAMP)
  private String shipDate;

  @Column(name = "total_Price")
  @Min(value = 0, message = "Price must be non-negative")
  private double total_Price;

  @JsonIgnore
  @OneToMany(mappedBy = "order")
  private List<VoucherUsage> voucherUsages;

  @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
  private Pays pays;

  @JsonIgnore
  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private List<OrderDetail> orderDetails;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private Users user;

  @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
  private Shipping shipping;


  @PrePersist
  public void prePersistActions() {
    // Thực hiện hành động trước khi lưu vào cơ sở dữ liệu ở đây
    if (this.shipStatus == null) {
      this.shipStatus = "NOT_CONFIRM";
    }
    if (this.payStatus == null) {
      this.payStatus = "NOT_PAY";
    }
  }


}


