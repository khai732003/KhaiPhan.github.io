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
        private Long categoryId; // To represent the category ID
        private List<CommentDTO> comments;
        private List<FeedbackDTO> feedbacks;
        private List<OrderDetailDTO> orderDetails;
//        private List<RatingDTO> ratings;
        private BirdCageDTO cage;
        private List<AccessoryDTO> accessories;

}
