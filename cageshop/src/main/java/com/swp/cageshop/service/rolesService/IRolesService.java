package com.swp.cageshop.service.rolesService;

import com.swp.cageshop.entity.Roles;
import java.util.List;
import org.springframework.http.ResponseEntity;


public interface IRolesService {
  public ResponseEntity<?> addRoles(Roles roles);

  public boolean deleteRoles(long id);

  public List<Roles> listRoles();
}
