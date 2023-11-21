package com.swp.cageshop.DTO;

import com.swp.cageshop.entity.VoucherUsage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoucherUsageVoucherAmountDTO {

    private Long id;
    private Long orderId;
    private double voucherAmount;
    private String code;


}
