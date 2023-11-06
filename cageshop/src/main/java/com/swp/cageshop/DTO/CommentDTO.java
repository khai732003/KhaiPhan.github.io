package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO extends DTOBase {
    private String title;
    private String content;
    private Long userId;
    private Long productId;
    private Long marketingId;

}
