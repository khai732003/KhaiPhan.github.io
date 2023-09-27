package com.swp.cageshop.service.usersService;

import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.RolesRepository;
import com.swp.cageshop.repository.UsersRepository;
import java.util.List;
import javax.management.relation.RoleNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UsersServiceImpl implements IUsersService {

  @Autowired
  private UsersRepository usersRepository;
  @Autowired
  private RolesRepository rolesRepository;

  private Roles roles;


  @Override
  public ResponseEntity<?> registerUsers(Users users) {
    if (users != null && users.getRole() != null) {
      Roles existingRole = rolesRepository.findById(users.getRole().getId()).orElse(null);
      if (existingRole != null) {
        if (users.getRole().getName().equals(existingRole.getName())) {
          Users registeredUser = usersRepository.save(users);
          return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        } else {
          return new ResponseEntity<>("NameRole không khớp với vai trò", HttpStatus.BAD_REQUEST);
        }
      } else {
        return new ResponseEntity<>("Vai trò không tồn tại", HttpStatus.BAD_REQUEST);
      }
    } else {
      return new ResponseEntity<>("Thông tin người dùng không hợp lệ", HttpStatus.BAD_REQUEST);
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
