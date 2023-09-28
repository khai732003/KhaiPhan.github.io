package com.swp.cageshop.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO extends DTOBase{

  private String email;

  private String name;

  private String password;

  private String phone;

  private String address;

  private Long roleId;

}
