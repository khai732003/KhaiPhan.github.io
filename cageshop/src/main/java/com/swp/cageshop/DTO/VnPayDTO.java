package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data

public class VnPayDTO extends PaymentDTO{
    public String vnp_OrderInfo;
    public String vnp_OrderType = "200000";
    public String vnp_BankCode;

}
