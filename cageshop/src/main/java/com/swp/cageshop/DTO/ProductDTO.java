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
        private String productImage;
        private List<String> productDetailImage;
        private int stock;
        private double totalPrice;
        private String status;
        private int orderLevel;
        private Long categoryId; // To represent the category ID
        private List<CommentDTO> comments;
        private List<FeedbackDTO> feedbacks;
        private List<OrderDetailDTO> orderDetails;

        private BirdCageDTO cage;
        private List<AccessoryDTO> accessories;



        public double getTotalPrice() {
                double totalPrice = 0;

                if (cage != null) {
                        totalPrice += cage.getPrice();
                }

                // Thêm giá tiền của AccessoryDTO nếu chúng tồn tại
                if (accessories != null) {
                        for (AccessoryDTO accessory : accessories) {
                                totalPrice += accessory.getPrice();
                        }
                }

                return totalPrice;
        }
}





