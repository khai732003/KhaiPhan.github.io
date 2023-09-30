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
        private String title;
        private String content;
        private Long userId; // Representing the user's ID
        private Long productId; // Representing the product's ID


    }
