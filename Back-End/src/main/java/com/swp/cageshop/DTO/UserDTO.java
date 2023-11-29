package com.swp.cageshop.DTO;

import jakarta.persistence.Column;
import java.io.Serializable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;


@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserDTO extends DTOBase implements Serializable {

  private String email;

  private String name;

  private String fullname;

  private String gender;

  private String password;

  private String image;

  private String phone;

  private String address;

  private Long roleId;

  private Long managerId;

  private boolean status;


}
