package com.swp.cageshop.service.rolesService;

import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.repository.RolesRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolesServiceImpl implements IRolesService{

  @Autowired
  private RolesRepository rolesRepository;

  @Override
  public Roles addRoles(Roles roles) {
      if(roles != null){
      return rolesRepository.save(roles);
    }
    return null;
  }

  @Override
  public boolean deleteRoles(long id) {
      if(id >= 1){
        Roles roles = rolesRepository.getReferenceById(id);
        if (roles != null){
          rolesRepository.delete(roles);
          return true;
        }
      }
      return false;

  }

  @Override
  public List<Roles> listRoles() {
    return rolesRepository.findAll();
  }
}
