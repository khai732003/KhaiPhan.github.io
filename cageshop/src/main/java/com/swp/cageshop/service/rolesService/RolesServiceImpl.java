package com.swp.cageshop.service.rolesService;

import com.swp.cageshop.DTO.RoleDTO;
import com.swp.cageshop.entity.Roles;
import com.swp.cageshop.repository.RolesRepository;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class RolesServiceImpl implements IRolesService {

  @Autowired
  private RolesRepository rolesRepository;

  @Autowired
  private ModelMapper modelMapper;

  @Override
  public RoleDTO addRole(RoleDTO roleDTO) {
    if (roleDTO != null) {
      try {
        // Chuyển đổi từ RoleDTO sang Roles
        Roles roles = modelMapper.map(roleDTO, Roles.class);

        // Lưu Roles vào cơ sở dữ liệu
        Roles savedRoles = rolesRepository.save(roles);

        // Chuyển đổi từ Roles sang RoleDTO
        RoleDTO savedRoleDTO = modelMapper.map(savedRoles, RoleDTO.class);

        return savedRoleDTO;
      } catch (DataIntegrityViolationException e) {
        // Xử lý trường hợp trùng roleName
        throw new RuntimeException("Tên vai trò đã tồn tại");
      }
    } else {
      throw new RuntimeException("RoleDTO không hợp lệ");
    }
  }


  @Override
  public List<Roles> listRoles() {
    return rolesRepository.findAll();
  }
}
