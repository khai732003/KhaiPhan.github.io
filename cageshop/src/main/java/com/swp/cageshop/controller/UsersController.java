package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.LoginDTO;
import com.swp.cageshop.DTO.UserDTO;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.service.usersService.IUsersService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cageshop")
public class UsersController {

  @Autowired
  private IUsersService iUsersService;

  @PostMapping("/authenticate")
  public String authenticate(@RequestBody LoginDTO loginDTO)
  { return  iUsersService.authenticate(loginDTO);}

  @GetMapping("/haha")
  public String haha(){
    return "helo";
  }

  @PostMapping("/register")
  public ResponseEntity<?> register (@RequestBody UserDTO userDTO)
  { return  iUsersService.register(userDTO);}

  @PutMapping("/user/update/{id}")
  public UserDTO updateProfile(@PathVariable long id,@RequestBody UserDTO userDTO){
    return iUsersService.updateUsers(id,userDTO);
  }

  @GetMapping("/user/list")
  public List<Users> listAllUsers(){
    return iUsersService.listAll();
  }


  @GetMapping("/user/test")
  public List<UserDTO> listAll(){
    return iUsersService.list();
  }

}
