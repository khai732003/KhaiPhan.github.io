package com.swp.cageshop.controller;

import com.swp.cageshop.entity.Admins;
import com.swp.cageshop.entity.Marketings;
import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.service.adminsService.IAdminsService;
import com.swp.cageshop.service.rolesService.IRolesService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("cageshop")
public class AdminsController {

  @Autowired
  private IRolesService iRolesService;

@GetMapping("/role/haha")
  public String test(){
    return "cmmsds";
  }

  @PostMapping("/role/add")
  public Roles addMarketing (Roles roles){
    return iRolesService.addRoles(roles);
  }

  @GetMapping("/admin/list")
  public List<Roles> listMarketings(){
    return iRolesService.listRoles();
  }

}
