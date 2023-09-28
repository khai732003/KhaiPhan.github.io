package com.swp.cageshop.service.rolesService;

import com.swp.cageshop.DTO.RoleDTO;
import com.swp.cageshop.entity.Roles;
import java.util.List;
import org.springframework.http.ResponseEntity;


public interface IRolesService {
  public RoleDTO addRole(RoleDTO roleDTO);

  public List<Roles> listRoles();
}
