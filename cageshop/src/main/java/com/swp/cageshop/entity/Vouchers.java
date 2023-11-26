package com.swp.cageshop.entity;



import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
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

  @Column
  private LocalDateTime expiration_date;

  @Column
  @Min(value = 0, message = "Quantity must be non-negative")
  private int quantity;

  @Column(name = "is_available")
  private boolean isAvailable;

  @PrePersist
  public void setDefaultValues() {
    this.isAvailable = true;
  }

  @JsonIgnore
  @OneToMany(mappedBy="voucher", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<VoucherUsage> usages;

}
