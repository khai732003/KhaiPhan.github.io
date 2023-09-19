package com.swp.cageshop.service.rolesService;

import com.swp.cageshop.entity.Roles;
import java.util.List;


public interface IRolesService {
  public Roles addRoles(Roles roles);

  public List<Roles> listRoles();
}
