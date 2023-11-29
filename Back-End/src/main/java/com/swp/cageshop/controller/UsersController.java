package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.LoginDTO;
import com.swp.cageshop.DTO.UserDTO;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.service.usersService.IUsersService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@CrossOrigin

@RequestMapping("/cageshop/api")
public class UsersController {

  @Autowired
  private IUsersService iUsersService;

  @GetMapping("/user/findpassword/{phone}")
  public UserDTO findPasswordByPhone(@PathVariable String phone){
    return iUsersService.listPasswordsByPhone(phone);
  }
  @PostMapping("/user/authenticate")
  public String authenticate(@RequestBody LoginDTO loginDTO)
  { return  iUsersService.authenticate(loginDTO);}

  @PostMapping("/user/register")
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

  @GetMapping("/user/list/{id}")
  public Optional<Users> listAllUsers(@PathVariable Long id){
    return iUsersService.getUserById(id);
  }

  @GetMapping("/user/listbymanager/{id}")
public List<UserDTO> listStaffByManagerId(@PathVariable Long id){
    return iUsersService.getStaffByManagerId(id);
}
  @GetMapping("/user/listdto")
  public List<UserDTO> listAll(){
    return iUsersService.list();
  }

  @GetMapping("/user/find/{name}")
public List<Users> findByName(@PathVariable String name, @RequestBody Users users){
    return iUsersService.findByName(name, users);
  }

  @DeleteMapping("/user/deleteAll")
  public void deleteAll(){
     iUsersService.deleteAllUsers();
  }

  @DeleteMapping("/user/delete/{id}")
  public ResponseEntity<?> deleteById(@PathVariable Long id){
    return iUsersService.deleteById(id);
  }

  @PutMapping("/user/ban/{id}")
  public void banUserById(@PathVariable Long id){
    iUsersService.updateStatus(id);
  }

  @PutMapping("/user/resetpassword/{id}")
  public UserDTO resetById(@PathVariable Long id, @RequestBody UserDTO dto){
    return iUsersService.resetPassword(id, dto);
  }

  @GetMapping("/user/listformadmin")
  public List<Users> listAllExpectAdmin(){
    return iUsersService.listAllExpectAdmin();
  }

  @GetMapping("/user/liststaff")
  public List<Users> listAllStaff(){
    return iUsersService.listAllStaff();
  }

  @GetMapping("/user/liststaffandfalse")
  public List<Users> listAllStaffAndStatusFals(){
    return iUsersService.listAllStaffAndStatusFalse();
  }
  @GetMapping("/user/shipBy/{orderId}")
  public String shipNameBy(@PathVariable Long orderId){
    return iUsersService.shipNameBy(orderId);
  }
}
