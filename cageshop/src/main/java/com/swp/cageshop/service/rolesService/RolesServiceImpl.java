package com.swp.cageshop.service.rolesService;

import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.repository.RolesRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RolesServiceImpl implements IRolesService{

  private RolesRepository rolesRepository;
  @Override
  public Roles addRoles(Roles roles) {
      if(roles != null){
      return rolesRepository.save(roles);
    }
    return null;
  }

  @Override
  public List<Roles> listRoles() {
    return rolesRepository.findAll();
  }
}
