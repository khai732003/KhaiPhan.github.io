package com.swp.cageshop.service.rolesService;

import com.swp.cageshop.entity.Roles;
import java.util.List;


public interface IRolesService {
  public Roles addRoles(Roles roles);

  public boolean deleteRoles(long id);

  public List<Roles> listRoles();
}
