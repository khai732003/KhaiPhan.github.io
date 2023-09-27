package com.swp.cageshop.controller;

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

  @PostMapping("/user/register")
  public ResponseEntity<?> registerUsers(@RequestBody  Users users){
    return iUsersService.registerUsers(users);
  }

  @PutMapping("/user/update/{id}")
  public Users updateProfile(@PathVariable long id,@RequestBody Users users){
    return iUsersService.updateUsers(id,users);
  }

  @GetMapping("/user/list")
  public List<Users> listAllUsers(){
    return iUsersService.listAll();
  }
}
