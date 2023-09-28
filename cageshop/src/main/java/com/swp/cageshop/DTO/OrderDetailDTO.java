package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO extends DTOBase{
    private Long orderID;
    private Long productID;
}
