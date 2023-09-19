package com.swp.cageshop.service.usersService;

import com.swp.cageshop.entity.Users;

public interface IUsersService {
  public Users addUsers(Users users);

  public Users checkLogin(String email, String password);

  public Users updateUsers(Users users);
}
