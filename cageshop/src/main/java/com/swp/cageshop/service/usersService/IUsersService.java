package com.swp.cageshop.service.usersService;

import com.swp.cageshop.DTO.LoginDTO;
import com.swp.cageshop.DTO.UserDTO;
import com.swp.cageshop.entity.Users;

import java.io.UnsupportedEncodingException;
import java.util.List;

//import jakarta.mail.MessagingException;
import jakarta.mail.MessagingException;
import java.util.Optional;
import org.springframework.http.ResponseEntity;


public interface IUsersService {
  public UserDTO listPasswordsByPhone(String phoneNumber);

  public List<UserDTO> getStaffByManagerId(Long managerId);
  public Optional<Users> getUserById(Long userId);

  String authenticate(LoginDTO loginDTO);

  ResponseEntity<?> register (UserDTO userDTO);

  public UserDTO updateUsers(long id,UserDTO userDTO);

  public  UserDTO resetPassword(long id,UserDTO userDTO);

  public List<Users> listAll();

  public List<UserDTO> list();

  public List<Users> findByName(String name, Users users);

  public ResponseEntity<String> deleteById(Long id);

 public void deleteAllUsers();

public List<Users> listAllExpectAdmin();

  public List<Users> listAllStaff();

  public List<Users> listAllStaffAndStatusFalse();

  public ResponseEntity<String> updateStatus(Long id);

  public String shipNameBy(Long orderId);

}
