package com.swp.cageshop.DTO;

import java.util.Date;

import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTOBase {
  private Long id;
  private Date createDate;
}
