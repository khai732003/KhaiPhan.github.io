package com.swp.cageshop.service.usersService;

import com.swp.cageshop.DTO.UserDTO;
import com.swp.cageshop.entity.Users;
import java.util.List;
import org.springframework.http.ResponseEntity;

public interface IUsersService {
  public UserDTO registerUsers(UserDTO userDTO);

  public UserDTO updateUsers(long id,UserDTO userDTO);

  public List<Users> listAll();
}
