package com.swp.cageshop.DTO;

import jakarta.persistence.Transient;
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
        private Long categoryId;
        private List<CommentDTO> comments;
        private List<FeedbackDTO> feedbacks;
        private List<OrderDetailDTO> orderDetails;
        private BirdCageDTO cage;
        private List<AccessoryDTO> accessories;
        private Long motherProductId;
        private String note;
        private double extraPrice;

}





