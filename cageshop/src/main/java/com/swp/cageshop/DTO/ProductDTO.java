package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO extends DTOBase {

        private String name;
        private String code;
        private String description;
        private String material;
        private String size;
        private double price;
        private String image;
        private String type;
        private String status;
        private Date date;
        private Long categoryId;


        private List<ProductDTO> accessories;



        public void addAccessory(ProductDTO accessory) {
                if (accessory != null) {
                        if (accessories == null) {
                                accessories = new ArrayList<>();
                        }
                        accessories.add(accessory);
                }
        }

        public double getTotalPrice() {
                double totalPrice = this.price;
                if (accessories != null) {
                        for (ProductDTO accessory : accessories) {
                                totalPrice += accessory.getPrice();
                        }
                }
                return totalPrice;
        }

    }
