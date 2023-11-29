package com.swp.cageshop.controller;

import com.swp.cageshop.DTO.RoleDTO;
import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.service.rolesService.IRolesService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/cageshop/api")
public class RolesController {

  @Autowired
  private IRolesService iRolesService;

  @PostMapping("/role/add")
  public RoleDTO addRoles(@RequestBody RoleDTO roleDTO){
    return iRolesService.addRole(roleDTO);
  }

  @GetMapping("/role/list")
  public List<Roles> listRoles(){
    return iRolesService.listRoles();
  }
}
