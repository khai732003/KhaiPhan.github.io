package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarketingDTO extends DTOBase {
    private String title;
    private String name;
    private String img;
    private String info;
    private String shortinfo;
}
