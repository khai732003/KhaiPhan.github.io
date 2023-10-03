package com.swp.cageshop.service.usersService;

import com.swp.cageshop.DTO.LoginDTO;
import com.swp.cageshop.DTO.UserDTO;
import com.swp.cageshop.entity.Users;
import java.util.List;
import org.springframework.http.ResponseEntity;


public interface IUsersService {

  String authenticate(LoginDTO loginDTO);

  ResponseEntity<?> register (UserDTO userDTO);

  public UserDTO updateUsers(long id,UserDTO userDTO);

  public  UserDTO resetPassword(long id,UserDTO userDTO);

  public List<Users> listAll();

}
