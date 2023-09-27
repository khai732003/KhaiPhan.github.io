package com.swp.cageshop.service.rolesService;

import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.repository.RolesRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RolesServiceImpl implements IRolesService{

  @Autowired
  private RolesRepository rolesRepository;

  @Override
  public ResponseEntity<?> addRoles(Roles roles) {
    if (roles != null) {
      try {
        // Thử lưu Roles vào cơ sở dữ liệu
        Roles savedRoles = rolesRepository.save(roles);
        return new ResponseEntity<>(savedRoles, HttpStatus.CREATED);
      } catch (DataIntegrityViolationException e) {
        // Xử lý trường hợp trùng roleName
        return new ResponseEntity<>("Tên vai trò đã tồn tại", HttpStatus.BAD_REQUEST);
      }
    } else {
      return new ResponseEntity<>("Roles không hợp lệ", HttpStatus.BAD_REQUEST);
    }
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
