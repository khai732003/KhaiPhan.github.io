package com.swp.cageshop.DTO;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PayDTO extends DTOBase{
    public double vnp_Ammount;
    public String vnp_OrderInfo;
    public String vnp_OrderType = "200000";
    public Long vnp_TxnRef;
    public String vnp_BankCode;
    public String status;
    public Long orderId;
}
