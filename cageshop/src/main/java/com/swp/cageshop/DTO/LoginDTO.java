package com.swp.cageshop.DTO;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginDTO {
    //it's a Data Trasfer Object for Login
    private String name ;
    private String password ;
}
