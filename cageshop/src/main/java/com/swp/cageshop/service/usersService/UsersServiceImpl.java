package com.swp.cageshop.service.usersService;

import com.swp.cageshop.DTO.RoleDTO;
import com.swp.cageshop.DTO.UserDTO;
import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.RolesRepository;
import com.swp.cageshop.repository.UsersRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import javax.management.relation.RoleNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UsersServiceImpl implements IUsersService {

  @Autowired
  private UsersRepository usersRepository;

  @Autowired
  private RolesRepository rolesRepository;

  @Autowired
  private ModelMapper modelMapper;


  @Override
  @Transactional
  public UserDTO registerUsers(UserDTO userDTO) {
    // Kiểm tra xem userDTO có tồn tại
    if (userDTO == null) {
      throw new IllegalArgumentException("UserDTO không hợp lệ");
    }

    // Chuyển đổi từ UserDTO sang Users
    Users users = modelMapper.map(userDTO, Users.class);

    // Kiểm tra xem role_id có tồn tại trong bảng roles không
    if (users.getRole() == null || users.getRole().getId() == null) {
      throw new IllegalArgumentException("Role không tồn tại");
    }

    try {
      // Lưu Users vào cơ sở dữ liệu
      Users savedUsers = usersRepository.save(users);

      // Chuyển đổi từ Users sang UserDTO
      UserDTO savedUserDTO = modelMapper.map(savedUsers, UserDTO.class);

      return savedUserDTO;
    } catch (DataIntegrityViolationException e) {
      // Xử lý trường hợp trùng username hoặc lỗi khác
      throw new RuntimeException("Lỗi khi đăng ký người dùng: " + e.getMessage());
    }
  }



  @Override
  public Users updateUsers(long id, Users users) {
    if (users != null) {
      Users users1 = usersRepository.getReferenceById(id);
      if (users1 != null) {
        users1.setName(users.getName());
        users1.setAddress(users.getAddress());
        users1.setPhone(users.getPhone());
        return usersRepository.save(users1);
      }
    }
    return null;
  }

  public List<Users> listAll(){
    return usersRepository.findAll();
  }
}
