package com.swp.cageshop.entity;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Vouchers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vouchers{

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "create_date")
  private LocalDateTime createDate;

  @Column(nullable = false, unique = true)
  private String code;

  @Column
  private String description;

  @Column(nullable = false)
  private double voucherAmount;

  @Column(name="voucherType")
  private String voucherType;

  @Column
  private LocalDateTime expiration_date;

  @Column
  private int quantity;

  @OneToMany(mappedBy="voucher", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<VoucherUsage> usages;
  @PrePersist
  public void onPersist() {
    this.createDate = LocalDateTime.now();
  }
}
