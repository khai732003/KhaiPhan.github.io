package com.swp.cageshop.service.adminsService;

import com.swp.cageshop.entity.Admins;
import com.swp.cageshop.entity.Marketings;
import com.swp.cageshop.entity.Users;
import com.swp.cageshop.repository.AdminsReposity;
import com.swp.cageshop.repository.MarketingsRepository;
import com.swp.cageshop.repository.UsersRepository;
import com.swp.cageshop.service.marketingsService.MarketingsServiceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminsServiceImpl implements IAdminsService{

  private AdminsReposity adminsReposity;
  private MarketingsRepository marketingsRepository;
  private UsersRepository usersRepository;


  @Override
  public Admins addAdmins(Admins admins) {
    if(admins != null){return adminsReposity.save(admins);
    }
    return null;
  }

  @Override
  public boolean deleteUsers(long id) {
    return false;
  }

  @Override
  public Marketings addMarketings(Marketings marketings) {
    return null;
  }

  @Override
  public List<Marketings> listMarketings() {
    return null;
  }

//  @Override
//  public boolean deleteUsers(long id) {
//    if(id >= 1){
//      Users users = usersRepository.getReferenceById(id);
//      if (users != null){
//        usersRepository.delete(users);
//        return true;
//      }
//    }
//    return false;
//  }
//
//  @Override
//  public Marketings addMarketings(Marketings marketings) {
//    if(marketings != null){
//      return marketingsRepository.save(marketings);
//    }
//    return null;
//  }
//
//  @Override
//  public List<Marketings> listMarketings() {
//    return marketingsRepository.findAll();
//  }

}
