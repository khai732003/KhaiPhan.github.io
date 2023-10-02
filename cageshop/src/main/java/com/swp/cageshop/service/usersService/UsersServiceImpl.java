package com.swp.cageshop.service.usersService;

import com.swp.cageshop.DTO.BearerToken;
import com.swp.cageshop.DTO.LoginDTO;
import com.swp.cageshop.DTO.UserDTO;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.security.JwtUtilities;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
    if(usersRepository.existsByName(userDTO.getName()))
    { return  new ResponseEntity<>("name is already taken !", HttpStatus.SEE_OTHER); }
    else
    { Users users = modelMapper.map(userDTO, Users.class);
      users.setPassword(passwordEncoder.encode(userDTO.getPassword()));
      Users savedUsers = usersRepository.save(users);
      UserDTO savedUserDTO = modelMapper.map(savedUsers, UserDTO.class);

      String token = jwtUtilities.generateToken(userDTO.getName(),users.getRole().getName());
      return new ResponseEntity<>(new BearerToken(token , "Bearer "),HttpStatus.OK);

    }
  }

  @Override
  @Transactional
  public UserDTO registerUsers(UserDTO userDTO) {
    if (userDTO == null) {
      throw new IllegalArgumentException("UserDTO không hợp lệ");
    }
    Users users = modelMapper.map(userDTO, Users.class);

    if (users.getRole() == null || users.getRole().getId() == null) {
      throw new IllegalArgumentException("Role không tồn tại");
    }
    try {
      users.setPassword(passwordEncoder.encode(users.getPassword()));
      Users savedUsers = usersRepository.save(users);
      UserDTO savedUserDTO = modelMapper.map(savedUsers, UserDTO.class);

      return savedUserDTO;
    } catch (DataIntegrityViolationException e) {
      throw new RuntimeException("Lỗi khi đăng ký người dùng: " + e.getMessage());
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


}
