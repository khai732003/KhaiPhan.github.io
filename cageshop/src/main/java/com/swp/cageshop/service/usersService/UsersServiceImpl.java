package com.swp.cageshop.service.usersService;

import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.UsersRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersServiceImpl implements IUsersService {

  @Autowired
  private UsersRepository usersRepository;

  @Override
  public Users registerUsers(Users users) {
    if (users != null) {
      return usersRepository.save(users);
    }
    return null;
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
