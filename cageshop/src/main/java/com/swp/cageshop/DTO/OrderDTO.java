package com.swp.cageshop.DTO;

import com.swp.cageshop.entity.OrderDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO extends DTOBase{
    private String status;
    private String paymentMethod;
    private String shipAddress;
    private double shipPrice;
    private String content;
    private String shipDate;
    private double total_price;
    private Long userId;
    

//    public void setShipPriceBasedOnAddress() {
//        String address = this.shipAddress.toLowerCase();
//        if (address.contains("Hồ Chí Minh") || address.contains("hcm")) {
//            this.shipPrice = 30000;
//        } else {
//            this.shipPrice = 50000;
//        }
//    }

}
