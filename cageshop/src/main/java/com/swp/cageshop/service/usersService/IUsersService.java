package com.swp.cageshop.service.usersService;

import com.swp.cageshop.entity.Users;
import java.util.List;

public interface IUsersService {
  public Users registerUsers(Users users);

  public Users updateUsers(long id,Users users);

  public List<Users> listAll();
}
