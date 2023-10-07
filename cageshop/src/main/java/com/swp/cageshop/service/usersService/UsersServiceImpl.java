package com.swp.cageshop.service.usersService;

import com.swp.cageshop.DTO.BearerToken;
import com.swp.cageshop.DTO.LoginDTO;
import com.swp.cageshop.DTO.UserDTO;
import com.swp.cageshop.entity.Users;
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

    String token = jwtUtilities.generateToken(users.getName(),rolesNames);
    return token;
  }

  @Override
  public ResponseEntity<?> register(UserDTO userDTO) {
    if(usersRepository.existsByName(userDTO.getName()) || usersRepository.existsByEmail(userDTO.getEmail()))
    { return  new ResponseEntity<>("name or email is already taken !", HttpStatus.SEE_OTHER); }
    else
    { Users users = modelMapper.map(userDTO, Users.class);
      if (userDTO.getManagerId() != null){
        Users users1 = usersRepository.getReferenceById(userDTO.getManagerId());
        users.setManager(users1);
      }
      users.setPassword(passwordEncoder.encode(userDTO.getPassword()));
      usersRepository.save(users);

      String token = jwtUtilities.generateToken(userDTO.getName(),users.getRole().getName());
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
        Date currentCreateDate = users1.getCreateDate();

        users1.setName(users.getName());
        users1.setFullname(users.getFullname());
        users1.setAddress(users.getAddress());
        users1.setPhone(users.getPhone());
        users1.setCreateDate(currentCreateDate);
        //chuyển lại dto -> enitity
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


}