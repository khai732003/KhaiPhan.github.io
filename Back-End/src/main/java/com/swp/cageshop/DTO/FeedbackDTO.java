package com.swp.cageshop.DTO;

import com.swp.cageshop.entity.Products;
import com.swp.cageshop.entity.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO extends DTOBase
{
        private double rating;
        private String content;
        private Long userId;
        private Long productId;
        private String userName;
    }
