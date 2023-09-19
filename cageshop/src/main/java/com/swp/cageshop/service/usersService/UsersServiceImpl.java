package com.swp.cageshop.service.usersService;

import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersServiceImpl implements IUsersService{

  @Autowired
  private UsersRepository usersRepository;

  @Override
  public Users registerUsers(Users users) {
    if(users != null){
      return usersRepository.save(users);
    }
    return null;
  }


  @Override
  public Users updateUsers(Users users) {
    return null;
  }
}
