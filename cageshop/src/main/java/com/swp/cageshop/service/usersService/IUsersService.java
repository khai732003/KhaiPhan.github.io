package com.swp.cageshop.service.usersService;

import com.swp.cageshop.entity.Users;
import java.util.List;
import org.springframework.http.ResponseEntity;

public interface IUsersService {
  public ResponseEntity<?> registerUsers(Users users);

  public Users updateUsers(long id,Users users);

  public List<Users> listAll();
}
