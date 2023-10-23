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
public class Vouchers extends EntityBase{

  @Column(nullable = false, unique = true)
  private String code;

  @Column
  private String description;

  @Column(nullable = false)
  private double voucherAmount;

  @Column(name="voucherType")
  private String voucherType;

  @Column(nullable = false)
  private boolean isActive;

  @Column(nullable = false)
  private int quantity;

  @Column
  private LocalDateTime expiration_date;

  @OneToMany(mappedBy="voucher", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<VoucherUsage> usages;
}
