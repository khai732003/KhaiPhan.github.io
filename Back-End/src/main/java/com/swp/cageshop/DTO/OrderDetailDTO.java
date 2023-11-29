package com.swp.cageshop.DTO;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO extends DTOBase {
    private String name;

    private int quantity;

    private double totalOfProd;

    private double totalCost;

    private String note;

    private Long orderId;

    private Long productId;

    private String status;

    private String productImg;

}
