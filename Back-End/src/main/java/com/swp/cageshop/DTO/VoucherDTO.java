package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoucherDTO extends DTOBase {
    private String code;
    private String description;
    private double voucherAmount;
    private String voucherType;
    private LocalDateTime expiration_date;
    private int quantity;
    private boolean isAvailable;
}
