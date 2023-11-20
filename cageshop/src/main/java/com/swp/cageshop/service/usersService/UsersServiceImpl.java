package com.swp.cageshop.service.usersService;

import com.swp.cageshop.DTO.BearerToken;
import com.swp.cageshop.DTO.LoginDTO;
import com.swp.cageshop.DTO.UserDTO;
import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.RolesRepository;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.security.JwtUtilities;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;

import java.io.UnsupportedEncodingException;
import java.util.*;

import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
//import jakarta.mail.*;
//import jakarta.mail.internet.*;


@Service
public class UsersServiceImpl implements IUsersService {

  @Autowired
  private  AuthenticationManager authenticationManager ;

  @Autowired
  private JwtUtilities jwtUtilities ;

  @Autowired
  private UsersRepository usersRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Autowired
  private PasswordEncoder passwordEncoder;

  PasswordEncoder decoder;

  @Autowired
  private RolesRepository rolesRepository;

  @Override
  public UserDTO listPasswordsByPhone(String phoneNumber) {
    Optional<Users> usersOptional = usersRepository.findByPhone(phoneNumber);

    Users users = usersOptional.orElseThrow(() -> new UsernameNotFoundException("User not found"));

    // Retrieve the hashed password directly without encoding it
    String hashedPassword = users.getPassword();

    // Set the hashed password in UserDTO
    UserDTO dto = modelMapper.map(users, UserDTO.class);
    dto.setPassword(hashedPassword);

    return dto;
  }


  @Override
  public List<UserDTO> getStaffByManagerId(Long managerId) {
    List<Users> users = usersRepository.findByManagerId(managerId);
    return users.stream()
        .map(user -> modelMapper.map(user, UserDTO.class))
        .collect(Collectors.toList());
  }

  @Override
  public Optional<Users> getUserById(Long userId) {
    return usersRepository.findById(userId);
  }

  @Override
  public String authenticate(LoginDTO loginDto) {
    Authentication authentication= authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginDto.getName(),
            loginDto.getPassword()
        )
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);
    Users users = usersRepository.findByName(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    String rolesNames = users.getRole().getName();
    Long id = users.getId();
    String fullname = users.getFullname();
    String email = users.getEmail();
    String address = users.getAddress();
    String token = jwtUtilities.generateToken(users.getName(),fullname,rolesNames, id,address,email);
    return token;
  }

  @Override
  public ResponseEntity<?> register(UserDTO userDTO) {
    if(usersRepository.existsByName(userDTO.getName()) || usersRepository.existsByEmail(userDTO.getEmail()) || usersRepository.existsByPhone(userDTO.getPhone()))
    { return  new ResponseEntity<>("name or email or phone is already taken !", HttpStatus.SEE_OTHER); }
    else
    {
      Users users = modelMapper.map(userDTO, Users.class);
      if (userDTO.getManagerId() != null){
        Users users1 = usersRepository.getReferenceById(userDTO.getManagerId());
        users.setManager(users1);
      }
      users.setPassword(passwordEncoder.encode(userDTO.getPassword()));
      usersRepository.save(users);
      Roles roles = rolesRepository.getReferenceById(userDTO.getRoleId());
      String rolesNames = roles.getName();
      Long id = users.getId();
      String fullname = userDTO.getFullname();
      String address = userDTO.getAddress();
      String email = userDTO.getEmail();
      String token = jwtUtilities.generateToken(userDTO.getName(),fullname,rolesNames, id,address,email);
      return new ResponseEntity<>(new BearerToken(token , "Bearer "),HttpStatus.OK);

    }
  }


  @Override
  public UserDTO updateUsers(long id, UserDTO userDTO) {
    //chuyển dto -> entity
    Users users = modelMapper.map(userDTO, Users.class);
    if (users != null) {
      Users users1 = usersRepository.getReferenceById(id);
      if (users1 != null) {
        // Lưu trữ giá trị createDate hiện tại
//        Date currentCreateDate = users1.getCreateDate();
        users1.setFullname(users.getEmail());
        users1.setFullname(users.getFullname());
        users1.setImage(users.getImage());
        users1.setAddress(users.getAddress());
        users1.setPhone(users.getPhone());
//        users1.setCreateDate(currentCreateDate);
        //chuyển lại dto -> enitity
        usersRepository.save(users1);
        UserDTO saveUserDTO = modelMapper.map(users1, UserDTO.class);
        return saveUserDTO;
      }
    }
    return null;
  }

  @Override
  public UserDTO resetPassword(long id, UserDTO userDTO) {
    //chuyển dto -> entity
    Users users = modelMapper.map(userDTO, Users.class);
    if (users != null) {
      Users users1 = usersRepository.getReferenceById(id);
      if (users1 != null) {
        users1.setPassword(passwordEncoder.encode(users1.getPassword()));
        //chuyển lại dto -> enitity
        UserDTO saveUserDTO = modelMapper.map(users1, UserDTO.class);
        return saveUserDTO;
      }
    }
    return null;
  }

  public List<Users> listAll(){
    return usersRepository.findAll();
  }

  public List<UserDTO> list() {
      List<Users> users = usersRepository.findAll();

    // Chuyển đổi từ Users sang UserDTO bằng cách sử dụng Java Stream API
    List<UserDTO> userDTOs = users.stream()
        .map(user -> {
          UserDTO userDTO = new UserDTO();
          userDTO.setId(user.getId());
          userDTO.setName(user.getName());
          userDTO.setFullname(user.getFullname());
          userDTO.setEmail(user.getEmail());
          userDTO.setAddress(user.getAddress());
          userDTO.setGender(user.getGender());
          userDTO.setPassword(user.getPassword());
          userDTO.setImage(user.getImage());
          userDTO.setPhone(user.getPhone());
          userDTO.setRoleId(user.getRole().getId());
          userDTO.setCreateDate(user.getCreateDate());
          Users users1 = user.getManager();
          if (users1 != null) {
            userDTO.setManagerId(users1.getId());
          }
          return userDTO;
        })
        .collect(Collectors.toList());
    return  userDTOs;
  }
  @Override
  public List<Users> findByName(String name, Users users) {

    return usersRepository.findByNameContaining(name);
  }

  public ResponseEntity<String> deleteById(Long id) {
    try {
      usersRepository.deleteById(id);
      return ResponseEntity.status(HttpStatus.OK).body("Đã xóa.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Xóa không thành công.");
    }
  }


  @Override
  public void deleteAllUsers() {
    usersRepository.deleteAll();
  }

  @Override
  public List<Users> listAllExpectAdmin() {
    return usersRepository.findAllExceptAdmin();
  }

  @Override
  public List<Users> listAllStaff() {
    return usersRepository.findAllStaff();
  }

  @Override
  public List<Users> listAllStaffAndStatusFalse() {
    return usersRepository.findAllStaffAndStatusFalse();
  }



  @Override
  public ResponseEntity<String> updateStatus(Long id) {
    try {
      Users user = usersRepository.getReferenceById(id);
//      user.setStatus(false);
      usersRepository.save(user);
      return ResponseEntity.status(HttpStatus.OK).body("Đã update");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Update không thành công.");
    }
  }

  @Override
  public String shipNameBy(Long orderId) {
    return usersRepository.shipNameBy(orderId);
  }


}
