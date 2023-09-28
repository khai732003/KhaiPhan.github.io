package com.swp.cageshop.service.usersService;

import com.swp.cageshop.DTO.UserDTO;
import com.swp.cageshop.entity.Users;
import java.util.List;
import org.springframework.http.ResponseEntity;

public interface IUsersService {
  public UserDTO registerUsers(UserDTO userDTO);

  public Users updateUsers(long id,Users users);

  public List<Users> listAll();
}
