package com.swp.cageshop.service.adminsService;

import com.swp.cageshop.entity.Admins;
import com.swp.cageshop.entity.Marketings;
import com.swp.cageshop.entity.Users;
import java.util.List;

public interface IAdminsService {
  public Admins addAdmins(Admins admins);
  //delete users
  public boolean deleteUsers(long id);

  //add marketings
  public Marketings addMarketings(Marketings marketings);

  //list marketings
  public List<Marketings> listMarketings();
}
